package ru.bit.estimate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.Question;
import ru.bit.estimate.service.QuestionService;

import java.util.List;

@RestController
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("api/questions")
    public List<Question> getAllQuestion() {
        return questionService.getAllQuestions();
    }

    @GetMapping("api/questions/{id}")
    public Question getQuestionByID(@PathVariable long id) {
        return questionService.getQuestionByID(id);
    }

    @PostMapping("api/question")
    public void createQuestion(@RequestBody Question question) {
        questionService.createQuestion(question);
    }

    @PutMapping("api/question/{id}")
    public void updateQuestionByID(@RequestBody Question question,@PathVariable long id) {
        questionService.updateQuestionByID(question, id);
    }

    @DeleteMapping("api/question/{id}")
    public void deleteQuestionByID(@PathVariable long id) {
        questionService.deleteQuestionByID(id);
    }
}
