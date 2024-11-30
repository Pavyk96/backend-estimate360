package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.SurveyQuestionRequest;
import ru.bit.estimate.dto.SurveyQuestionResponse;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.model.SurveyQuestions;
import ru.bit.estimate.repository.QuestionRepo;
import ru.bit.estimate.repository.SurveyQuestionsRepo;
import ru.bit.estimate.repository.SurveyRepo;
import ru.bit.estimate.service.SurveyQuestionService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyQuestionServiceImpl implements SurveyQuestionService {
    @NonNull
    private final QuestionRepo questionRepository;

    @NonNull
    private final SurveyRepo surveyRepo;

    @NonNull
    private final SurveyQuestionsRepo surveyQuestionsRepo;

    @Override
    public List<SurveyQuestionResponse> getAll() {
        List<Survey> surveys = surveyRepo.findAll();

        return surveys.stream()
                .map(survey -> getById(survey.getId()))  // Вызов метода getById для каждого опроса
                .collect(Collectors.toList());
    }



    @Override
    public SurveyQuestionResponse getById(Long surveyId) {
        Survey survey = surveyRepo.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Опрос с id " + surveyId + " не найден"));

        List<Question> questions = surveyQuestionsRepo.findAllBySurveyId(surveyId).stream()
                .map(SurveyQuestions::getQuestion)
                .toList();

        return SurveyQuestionResponse.toDTO(survey, questions);
    }


    @Override
    public SurveyQuestionResponse create(SurveyQuestionRequest surveyRequest) {
        Survey survey = surveyRepo.findById(surveyRequest.getSurveyId())
                .orElseThrow(() -> new EntityNotFoundException("Опрос с ID " + surveyRequest.getSurveyId() + " не найден"));

        List<Question> questionList = questionRepository.findAllById(surveyRequest.getQuestionIdList());

        if (questionList.size() != surveyRequest.getQuestionIdList().size()) {
            throw new EntityNotFoundException("Некоторые вопросы из списка ID не найдены");
        }

        List<Long> existingQuestionIds = surveyQuestionsRepo.findAll().stream()
                .map(surveyQuestion -> surveyQuestion.getQuestion().getId())
                .toList();

        List<Question> newQuestions = questionList.stream()
                .filter(question -> !existingQuestionIds.contains(question.getId()))
                .toList();

        if (newQuestions.isEmpty()) {
            throw new IllegalArgumentException("Все переданные вопросы уже существуют в базе данных");
        }

        List<SurveyQuestions> surveyQuestionsList = newQuestions.stream()
                .map(question -> SurveyQuestions.builder()
                        .survey(survey)
                        .question(question)
                        .build())
                .toList();

        surveyQuestionsRepo.saveAll(surveyQuestionsList);

        return SurveyQuestionResponse.toDTO(survey, questionList);
    }


    @Override
    public SurveyQuestionResponse updateById(Long surveyId, SurveyQuestionRequest surveyRequest) {
        Survey survey = surveyRepo.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Опрос с ID " + surveyId + " не найден"));

        surveyQuestionsRepo.deleteById(surveyId);

        List<Question> questionList = questionRepository.findAllById(surveyRequest.getQuestionIdList());

        if (questionList.size() != surveyRequest.getQuestionIdList().size()) {
            throw new EntityNotFoundException("Некоторые вопросы из списка ID не найдены");
        }

        List<SurveyQuestions> surveyQuestionsList = questionList.stream()
                .map(question -> SurveyQuestions.builder()
                        .survey(survey)
                        .question(question)
                        .build())
                .toList();
        surveyQuestionsRepo.saveAll(surveyQuestionsList);

        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

    @Override
    @Transactional
    public void deleteById(Long surveyId) {
        if (!surveyRepo.existsById(surveyId)) {
            throw new EntityNotFoundException("Опрос с id " + surveyId + " не найден");
        }

        surveyQuestionsRepo.deleteAllBySurveyId(surveyId);
    }

    @Override
    public SurveyQuestionResponse addQuestionToSurvey(Long surveyId, Long questionId) {
        Survey survey = surveyRepo.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Survey not found with id: " + surveyId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        boolean alreadyExists = surveyQuestionsRepo.existsBySurveyAndQuestion(survey, question);
        if (alreadyExists) {
            throw new IllegalStateException("Question already exists in the survey");
        }

        SurveyQuestions surveyQuestions = new SurveyQuestions();
        surveyQuestions.setSurvey(survey);
        surveyQuestions.setQuestion(question);
        surveyQuestionsRepo.save(surveyQuestions);

        List<Question> questionList = surveyQuestionsRepo.findAllQuestionsBySurvey(survey);
        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

    @Override
    public SurveyQuestionResponse removeQuestionFromSurvey(Long surveyId, Long questionId) {
        Survey survey = surveyRepo.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Survey not found with id: " + surveyId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        SurveyQuestions surveyQuestions = surveyQuestionsRepo.findBySurveyAndQuestion(survey, question)
                .orElseThrow(() -> new EntityNotFoundException("This question is not associated with the survey"));
        surveyQuestionsRepo.delete(surveyQuestions);

        List<Question> questionList = surveyQuestionsRepo.findAllQuestionsBySurvey(survey);
        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

}
