package ru.bit.estimate.service;

import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswer;

import java.util.List;
import java.util.UUID;

public interface SurveyAnswerTableService {
    List<SurveyAnswer> getRecord();
    SurveyAnswer getRecordById(long id);
    SurveyAnswer createRecord(SurveyAnswerTableRequest request);
    void updateRecordById(SurveyAnswerTableRequest request, long id);
    void deleteRecordById(long id);
    List<SurveyAnswer> findByTargetId(UUID targetId);
}
