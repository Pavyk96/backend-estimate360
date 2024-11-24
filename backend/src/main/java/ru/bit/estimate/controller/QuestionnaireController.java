package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(
            summary = "Получить все опросники"
    )
    @GetMapping("/questionnaires")
    public List<Questionnaire> getAllQuestion() {
        return service.getAllQuestionnaire();
    }

    @Operation(
            summary = "Получить опросник по id",
            description = "Принимает id опросника"
    )
    @GetMapping("/questionnaires/{id}")
    public Questionnaire getQuestionByID(@PathVariable long id) {
        return service.getQuestionnaireById(id);
    }

    @Operation(
            summary = "Создать опросник",
            description = "Принимает ДТО опросника (название опросника)"
    )
    @PostMapping("/questionnaires")
    public Questionnaire createQuestion(@RequestBody QuestionnaireRequest request) {
        return service.createQuestionnaire(request);
    }

    @Operation(
            summary = "Изменить опросник по id",
            description = "Принимает ДТО опросника (название опросника)"
    )
    @PutMapping("/questionnaires/{id}")
    public Questionnaire updateQuestionByID(@RequestBody QuestionnaireRequest request, @PathVariable long id) {
        return service.updateQuestionnaireById(request, id);
    }

    @Operation(
            summary = "Удалить опросник по id"
    )
    @DeleteMapping("/questionnaires/{id}")
    public void deleteQuestionByID(@PathVariable long id) {
        service.deleteQuestionnaireById(id);
    }
}
