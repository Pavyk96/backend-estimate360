package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswerTable;
import ru.bit.estimate.service.impl.QuestionnaireAnswerTableServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyAnswerTableController {

    @NonNull
    private final QuestionnaireAnswerTableServiceImpl service;

    @GetMapping("/records")
    public List<SurveyAnswerTable> getRecorde() {
        return service.getRecord();
    }

    @GetMapping("/records/{id}")
    public SurveyAnswerTable getRecordeById(@PathVariable long id) {
        return service.getRecordById(id);
    }

    @PostMapping("/records")
    public SurveyAnswerTable createRecorde(@RequestBody SurveyAnswerTableRequest request) {
        return service.createRecord(request);
    }

    @PutMapping("/records/{id}")
    public void updateRecord(@RequestBody SurveyAnswerTableRequest request, @PathVariable long id) {
        service.updateRecordById(request, id);
    }

    @DeleteMapping("/records/{id}")
    public void deleteRecord(@PathVariable long id) {
        service.deleteRecordById(id);
    }
}
