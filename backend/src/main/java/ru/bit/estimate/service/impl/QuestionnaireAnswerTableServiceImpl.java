package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswerTable;
import ru.bit.estimate.repository.SurveyAnswerTableRepository;
import ru.bit.estimate.service.QuestionnaireAnswerTableService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionnaireAnswerTableServiceImpl implements QuestionnaireAnswerTableService {

    @NonNull
    private final SurveyAnswerTableRepository questionnaireRepository;

    public List<SurveyAnswerTable> getRecord() {
        return questionnaireRepository.findAll();
    }

    public SurveyAnswerTable getRecordById(long id) {
        return questionnaireRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Опросник не найден"));
    }

    public SurveyAnswerTable createRecord(SurveyAnswerTableRequest request) {
        return questionnaireRepository.save(SurveyAnswerTableRequest.fromDto(request));
    }

    public void updateRecordById(SurveyAnswerTableRequest request, long id) {
        SurveyAnswerTable oldQuestionnaire = getRecordById(id);
        SurveyAnswerTable updateQuestionnaire = SurveyAnswerTableRequest.fromDto(request);

        oldQuestionnaire.setSurveyId(updateQuestionnaire.getSurveyId());
        oldQuestionnaire.setQuestionId(updateQuestionnaire.getQuestionId());
        oldQuestionnaire.setUserId(updateQuestionnaire.getUserId());
        oldQuestionnaire.setAnswer(updateQuestionnaire.getAnswer());

        questionnaireRepository.save(oldQuestionnaire);
    }

    public void deleteRecordById(long id) {
        questionnaireRepository.deleteById(id);
    }
}
