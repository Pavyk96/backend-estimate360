package ru.bit.estimate.service;

import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.dto.QuestionResponse;

import java.util.List;

public interface QuestionService {

    List<QuestionResponse> getAllQuestions();

    QuestionResponse getQuestionByID(long id);

    QuestionResponse createQuestion(QuestionRequest request);

    QuestionResponse updateQuestionByID(QuestionRequest request, long id);

    void deleteQuestionByID(long id);

}
