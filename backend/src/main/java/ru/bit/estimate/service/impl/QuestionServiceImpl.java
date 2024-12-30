package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.dto.QuestionResponse;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.repository.QuestionRepository;
import ru.bit.estimate.repository.SurveyAnswerTableRepository;
import ru.bit.estimate.service.QuestionService;
import ru.bit.estimate.service.SurveyAnswerTableService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    @NonNull
    private final QuestionRepository questionRepository;

    @NonNull
    private final SurveyAnswerTableRepository answerTableRepository;

    /**
     * Получить все вопросы.
     *
     * @return список объектов QuestionResponse.
     */
    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(QuestionResponse::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Получить вопрос по идентификатору.
     *
     * @param id идентификатор вопроса.
     * @return объект QuestionResponse.
     */
    public QuestionResponse getQuestionByID(long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Вопрос не найден"));
        return QuestionResponse.toDTO(question);
    }

    /**
     * Создать новый вопрос.
     *
     * @param request данные запроса для создания вопроса.
     * @return созданный вопрос в виде объекта QuestionResponse.
     */
    public QuestionResponse createQuestion(QuestionRequest request) {
        Question question = QuestionRequest.fromDto(request);
        return QuestionResponse.toDTO(questionRepository.save(question));
    }

    /**
     * Обновить существующий вопрос по идентификатору.
     *
     * @param request данные запроса для обновления вопроса.
     * @param id      идентификатор существующего вопроса.
     * @return обновленный вопрос в виде объекта QuestionResponse.
     */
    public QuestionResponse updateQuestionByID(QuestionRequest request, long id) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Вопрос не найден"));

        existingQuestion.setType(request.getType());
        existingQuestion.setQuestion(request.getQuestion());
        existingQuestion.setAnswerScoreReversed(request.isAnswerScoreReversed());

        return QuestionResponse.toDTO(questionRepository.save(existingQuestion));
    }

    /**
     * Удалить вопрос по идентификатору.
     *
     * @param id идентификатор вопроса.
     */
    @Transactional
    public void deleteQuestionByID(long id) {
        if (!questionRepository.existsById(id)) {
            throw new EntityNotFoundException("Вопрос не найден");
        }

        // Удаляем все ответы, связанные с этим вопросом
        answerTableRepository.deleteAllByQuestionId(id);

        // Удаляем сам вопрос
        questionRepository.deleteById(id);
    }


}
