package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.service.QuestionService;

import java.util.List;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuestionController {

    @NonNull
    private final QuestionService questionService;

    @GetMapping("/questions")
    public List<Question> getAllQuestion() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/questions/{id}")
    public Question getQuestionByID(@PathVariable long id) {
        return questionService.getQuestionByID(id);
    }

    @PostMapping("/questions")
    public Question createQuestion(@RequestBody QuestionRequest question) {
        return questionService.createQuestion(question);
    }

    @PutMapping("/questions/{id}")
    public Question updateQuestionByID(@RequestBody QuestionRequest question, @PathVariable long id) {
        return questionService.updateQuestionByID(question, id);
    }

    @DeleteMapping("/questions/{id}")
    public void deleteQuestionByID(@PathVariable long id) {
        questionService.deleteQuestionByID(id);
    }
}