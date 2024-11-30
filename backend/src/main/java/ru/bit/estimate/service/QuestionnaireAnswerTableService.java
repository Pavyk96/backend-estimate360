package ru.bit.estimate.service;

import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswerTable;

import java.util.List;

public interface QuestionnaireAnswerTableService {
    List<SurveyAnswerTable> getRecord();
    SurveyAnswerTable getRecordById(long id);
    SurveyAnswerTable createRecord(SurveyAnswerTableRequest request);
    void updateRecordById(SurveyAnswerTableRequest request, long id);
    void deleteRecordById(long id);
}
