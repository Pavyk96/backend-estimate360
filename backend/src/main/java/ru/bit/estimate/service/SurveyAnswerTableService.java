package ru.bit.estimate.service;

import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswer;

import java.util.List;
import java.util.UUID;

public interface SurveyAnswerTableService {

    List<SurveyAnswer> getRecord();

    SurveyAnswer getRecordById(UUID id);

    SurveyAnswer createRecord(SurveyAnswerTableRequest request);

    void updateRecordById(SurveyAnswerTableRequest request, UUID id);

    void deleteRecordById(UUID id);

    List<SurveyAnswer> findByTargetId(UUID targetId);

}
