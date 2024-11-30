package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.SurveyQuestionRequest;
import ru.bit.estimate.dto.SurveyQuestionResponse;
import ru.bit.estimate.service.SurveyQuestionService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyQuestionController {

    @NonNull
    private final SurveyQuestionService service;

    @GetMapping("/surveys-questions")
    public List<SurveyQuestionResponse> getAll() {
        return service.getAll();
    }

    @GetMapping("/surveys-questions/{id}")
    public SurveyQuestionResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping("/surveys-questions")
    public SurveyQuestionResponse create(@RequestBody SurveyQuestionRequest surveyQuestionRequest) {
        return service.create(surveyQuestionRequest);
    }

    @PutMapping("/surveys-questions/{id}")
    public SurveyQuestionResponse update(@PathVariable Long id, @RequestBody SurveyQuestionRequest request) {
        return service.updateById(id, request);
    }

    @DeleteMapping("/surveys-questions/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}
