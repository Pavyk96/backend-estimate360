package ru.bit.estimate.controller;

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
import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswer;
import ru.bit.estimate.service.impl.SurveyAnswerTableServiceImpl;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyAnswerTableController {

    @NonNull
    private final SurveyAnswerTableServiceImpl service;

    @GetMapping("/records")
    public List<SurveyAnswer> getRecorde() {
        return service.getRecord();
    }

    @GetMapping("/records/{id}")
    public SurveyAnswer getRecordeById(@PathVariable UUID id) {
        return service.getRecordById(id);
    }

    @PostMapping("/records")
    public SurveyAnswer createRecorde(@RequestBody SurveyAnswerTableRequest request) {
        return service.createRecord(request);
    }

    @PutMapping("/records/{id}")
    public void updateRecord(@RequestBody SurveyAnswerTableRequest request, @PathVariable UUID id) {
        service.updateRecordById(request, id);
    }

    @DeleteMapping("/records/{id}")
    public void deleteRecord(@PathVariable UUID id) {
        service.deleteRecordById(id);
    }

}
