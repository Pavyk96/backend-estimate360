package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.QuestionnaireRequest;
import ru.bit.estimate.model.Questionnaire;
import ru.bit.estimate.service.QuestionnaireService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuestionnaireController {

    @NonNull
    private final QuestionnaireService service;

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
