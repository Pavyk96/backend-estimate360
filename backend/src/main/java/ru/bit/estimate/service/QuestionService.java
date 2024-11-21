package ru.bit.estimate.service;

import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestions();
    Question getQuestionByID(long id);
    Question createQuestion(QuestionRequest request);
    Question updateQuestionByID(QuestionRequest request, long id);
    void deleteQuestionByID(long id);
}
