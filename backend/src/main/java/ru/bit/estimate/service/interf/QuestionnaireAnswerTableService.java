package ru.bit.estimate.service.interf;

import ru.bit.estimate.dto.QuestionnaireAnswerTableRequest;
import ru.bit.estimate.model.QuestionnaireAnswerTable;

import java.util.List;

public interface QuestionnaireAnswerTableService {
    List<QuestionnaireAnswerTable> getRecord();
    QuestionnaireAnswerTable getRecordById(long id);
    QuestionnaireAnswerTable createRecord(QuestionnaireAnswerTableRequest request);
    void updateRecordById(QuestionnaireAnswerTableRequest request, long id);
    void deleteRecordById(long id);
}
