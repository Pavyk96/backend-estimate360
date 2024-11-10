package ru.bit.estimate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.dto.QuestionnaireRequest;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.model.Questionnaire;
import ru.bit.estimate.service.interf.QuestionnaireService;

import java.util.List;

@RequestMapping("/api")
@RestController
public class QuestionnaireController {
    @Autowired
    QuestionnaireService service;

    @GetMapping("/questionnaires")
    public List<Questionnaire> getAllQuestion() {
        return service.getAllQuestionnaire();
    }

    @GetMapping("/questionnaires/{id}")
    public Questionnaire getQuestionByID(@PathVariable long id) {
        return service.getQuestionnaireById(id);
    }

    @PostMapping("/questionnaire")
    public Questionnaire createQuestion(@RequestBody QuestionnaireRequest request) {
        return service.createQuestionnaire(request);
    }

    @PutMapping("/questionnaires/{id}")
    public Questionnaire updateQuestionByID(@RequestBody QuestionnaireRequest request, @PathVariable long id) {
        return service.updateQuestionnaireById(request, id);
    }

    @DeleteMapping("/questionnaires/{id}")
    public void deleteQuestionByID(@PathVariable long id) {
        service.deleteQuestionnaireById(id);
    }
}
