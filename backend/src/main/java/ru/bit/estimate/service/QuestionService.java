package ru.bit.estimate.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.repositories.QuestionRepository;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;


    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionByID(long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Вопрос не найден"));
    }


    public Question createQuestion(QuestionRequest request) {
        return questionRepository.save(QuestionRequest.fromDto(request));
    }

    public Question updateQuestionByID(QuestionRequest request, long id) {
        Question existingQuestion = getQuestionByID(id);
        Question updateQuestion = QuestionRequest.fromDto(request);

        existingQuestion.setType(updateQuestion.getType());
        existingQuestion.setQuestion(updateQuestion.getQuestion());

        return questionRepository.save(existingQuestion);
    }


    public void deleteQuestionByID(long id) {
        questionRepository.deleteById(id);
    }
}
