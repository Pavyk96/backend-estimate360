package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @Operation(
            summary = "Вернуть все анкеты"
    )
    @GetMapping("/surveys-questions")
    public List<SurveyQuestionResponse> getAll() {
        return service.getAll();
    }

    @Operation(
            summary = "Вернуть анкету по id"
    )
    @GetMapping("/surveys-questions/{id}")
    public SurveyQuestionResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @Operation(
            summary = "Создать анкету",
            description = "Принимает ДТО анкеты (Id вопросника; Лист id вопросов, " +
                    "которые будут содержаться в данной анкете)"
    )
    @PostMapping("/surveys-questions")
    public SurveyQuestionResponse create(@RequestBody SurveyQuestionRequest surveyQuestionRequest) {
        return service.create(surveyQuestionRequest);
    }

    @Operation(
            summary = "Отредактировать анкету по id",
            description = "Принимает id анкеты и ДТО анкеты (Id вопросника; Лист id вопросов, " +
                    "которые будут содержаться в данной анкете)" +
                    ". Метод назначает другие вопросы, к конкретному опроснику"
    )
    @PutMapping("/surveys-questions/{id}")
    public SurveyQuestionResponse update(@PathVariable Long id, @RequestBody SurveyQuestionRequest request) {
        return service.updateById(id, request);
    }

    @Operation(
            summary = "Удалить анкету по id"
    )
    @DeleteMapping("/surveys-questions/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

    @Operation(
            summary = "Добавить вопрос в анкету",
            description = "Добавляем в конкретный опросник (id вопросника), конкретный вопрос (id вопроса)"
    )
    @PostMapping("surveys-questions/surveys/{surveyId}/questions/{questionId}")
    public SurveyQuestionResponse addQuestionToSurvey(@PathVariable Long surveyId, @PathVariable Long questionId) {
        return service.addQuestionToSurvey(surveyId, questionId);
    }

    @Operation(
            summary = "Удаляем вопрос из анкеты",
            description = "Удаляем из конкретного опросника (id вопросника), конкретный вопрос (id вопроса)"
    )
    @DeleteMapping("surveys-questions/surveys/{surveyId}/questions/{questionId}")
    public SurveyQuestionResponse removeQuestionFromSurvey(@PathVariable Long surveyId, @PathVariable Long questionId) {
        return service.removeQuestionFromSurvey(surveyId, questionId);
    }

}
