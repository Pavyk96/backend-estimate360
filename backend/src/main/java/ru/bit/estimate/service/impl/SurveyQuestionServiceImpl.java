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
import ru.bit.estimate.repository.QuestionRepository;
import ru.bit.estimate.repository.SurveyQuestionsRepository;
import ru.bit.estimate.repository.SurveyRepository;
import ru.bit.estimate.service.SurveyQuestionService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyQuestionServiceImpl implements SurveyQuestionService {

    @NonNull
    private final QuestionRepository questionRepository;

    @NonNull
    private final SurveyRepository surveyRepository;

    @NonNull
    private final SurveyQuestionsRepository surveyQuestionsRepository;

    @Override
    public List<SurveyQuestionResponse> getAll() {
        List<Survey> surveys = surveyRepository.findAll();

        return surveys.stream()
                .map(survey -> getById(survey.getId()))  // Вызов метода getById для каждого опроса
                .collect(Collectors.toList());
    }

    @Override
    public SurveyQuestionResponse getById(Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Опрос с id " + surveyId + " не найден"));

        List<Question> questions = surveyQuestionsRepository.findAllBySurveyId(surveyId).stream()
                .map(SurveyQuestions::getQuestion)
                .toList();

        return SurveyQuestionResponse.toDTO(survey, questions);
    }

    @Override
    public SurveyQuestionResponse create(SurveyQuestionRequest surveyRequest) {
        Survey survey = surveyRepository.findById(surveyRequest.getSurveyId())
                .orElseThrow(() -> new EntityNotFoundException("Опрос с ID " + surveyRequest.getSurveyId() + " не найден"));

        List<Question> questionList = questionRepository.findAllById(surveyRequest.getQuestionIdList());

        if (questionList.size() != surveyRequest.getQuestionIdList().size()) {
            throw new EntityNotFoundException("Некоторые вопросы из списка ID не найдены");
        }

        List<Long> existingQuestionIds = surveyQuestionsRepository.findAll().stream()
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

        surveyQuestionsRepository.saveAll(surveyQuestionsList);

        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

    @Override
    public SurveyQuestionResponse updateById(Long surveyId, SurveyQuestionRequest surveyRequest) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Опрос с ID " + surveyId + " не найден"));

        surveyQuestionsRepository.deleteById(surveyId);

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
        surveyQuestionsRepository.saveAll(surveyQuestionsList);

        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

    @Override
    @Transactional
    public void deleteById(Long surveyId) {
        if (!surveyRepository.existsById(surveyId)) {
            throw new EntityNotFoundException("Опрос с id " + surveyId + " не найден");
        }

        surveyQuestionsRepository.deleteAllBySurveyId(surveyId);
    }

    @Override
    public SurveyQuestionResponse addQuestionToSurvey(Long surveyId, Long questionId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Survey not found with id: " + surveyId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        boolean alreadyExists = surveyQuestionsRepository.existsBySurveyAndQuestion(survey, question);
        if (alreadyExists) {
            throw new IllegalStateException("Question already exists in the survey");
        }

        SurveyQuestions surveyQuestions = new SurveyQuestions();
        surveyQuestions.setSurvey(survey);
        surveyQuestions.setQuestion(question);
        surveyQuestionsRepository.save(surveyQuestions);

        List<Question> questionList = surveyQuestionsRepository.findAllQuestionsBySurvey(survey);
        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

    @Override
    public SurveyQuestionResponse removeQuestionFromSurvey(Long surveyId, Long questionId) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new EntityNotFoundException("Survey not found with id: " + surveyId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        SurveyQuestions surveyQuestions = surveyQuestionsRepository.findBySurveyAndQuestion(survey, question)
                .orElseThrow(() -> new EntityNotFoundException("This question is not associated with the survey"));
        surveyQuestionsRepository.delete(surveyQuestions);

        List<Question> questionList = surveyQuestionsRepository.findAllQuestionsBySurvey(survey);
        return SurveyQuestionResponse.toDTO(survey, questionList);
    }

}
