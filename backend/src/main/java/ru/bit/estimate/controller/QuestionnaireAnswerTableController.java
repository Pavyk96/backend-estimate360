package ru.bit.estimate.controller;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.dto.QuestionnaireAnswerTableRequest;
import ru.bit.estimate.model.QuestionnaireAnswerTable;
import ru.bit.estimate.service.impl.QuestionnaireAnswerTableServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuestionnaireAnswerTableController {

    @NonNull
    private final QuestionnaireAnswerTableServiceImpl service;

    @GetMapping("/records")
    public List<QuestionnaireAnswerTable> getRecorde() {
        return service.getRecord();
    }

    @GetMapping("/records/{id}")
    public QuestionnaireAnswerTable getRecordeById(@PathVariable long id) {
        return service.getRecordById(id);
    }

    @PostMapping("/records")
    public QuestionnaireAnswerTable createRecorde(@RequestBody QuestionnaireAnswerTableRequest request) {
        return service.createRecord(request);
    }

    @PutMapping("/records/{id}")
    public void updateRecord(@RequestBody QuestionnaireAnswerTableRequest request, @PathVariable long id) {
        service.updateRecordById(request, id);
    }

    @DeleteMapping("/records/{id}")
    public void deleteRecord(@PathVariable long id) {
        service.deleteRecordById(id);
    }
}
