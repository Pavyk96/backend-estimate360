package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.service.SurveyService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyController {

    @NonNull
    private final SurveyService service;

    @Operation(
            summary = "Получить все опросники"
    )
    @GetMapping("/surveys")
    public List<Survey> getAllSurveys() {
        return service.getAllSurveys();
    }

    @Operation(
            summary = "Получить опросник по id",
            description = "Принимает id опросника"
    )
    @GetMapping("/surveys/{id}")
    public Survey getSurveyByID(@PathVariable long id) {
        return service.getSurveysById(id);
    }

    @Operation(
            summary = "Создать опросник",
            description = "Принимает ДТО опросника (название опросника)"
    )
    @PostMapping("/surveys")
    public Survey createSurvey(@RequestBody SurveyRequest request) {
        return service.createSurveys(request);
    }

    @Operation(
            summary = "Изменить опросник по id",
            description = "Принимает ДТО опросника (название опросника)"
    )
    @PutMapping("/surveys/{id}")
    public Survey updateSurveyByID(@RequestBody SurveyRequest request, @PathVariable long id) {
        return service.updateSurveysById(request, id);
    }

    @Operation(
            summary = "Удалить опросник по id"
    )
    @DeleteMapping("/surveys/{id}")
    public void deleteSurveyByID(@PathVariable long id) {
        service.deleteSurveysById(id);
    }
}
