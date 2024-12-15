package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.SurveyAnswerTableRequest;
import ru.bit.estimate.model.SurveyAnswer;
import ru.bit.estimate.repository.SurveyAnswerTableRepository;
import ru.bit.estimate.service.SurveyAnswerTableService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SurveyAnswerTableServiceImpl implements SurveyAnswerTableService {

    @NonNull
    private final SurveyAnswerTableRepository surveyAnswerTableRepository;

    @Override
    public List<SurveyAnswer> getRecord() {
        return surveyAnswerTableRepository.findAll();
    }

    @Override
    public SurveyAnswer getRecordById(long id) {
        return surveyAnswerTableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Опросник не найден"));
    }

    @Override
    public SurveyAnswer createRecord(SurveyAnswerTableRequest request) {
        return surveyAnswerTableRepository.save(SurveyAnswerTableRequest.fromDto(request));
    }

    @Override
    public void updateRecordById(SurveyAnswerTableRequest request, long id) {
        SurveyAnswer oldQuestionnaire = getRecordById(id);
        SurveyAnswer updateQuestionnaire = SurveyAnswerTableRequest.fromDto(request);

        oldQuestionnaire.setSurveyId(updateQuestionnaire.getSurveyId());
        oldQuestionnaire.setQuestionId(updateQuestionnaire.getQuestionId());
        oldQuestionnaire.setUserId(updateQuestionnaire.getUserId());
        oldQuestionnaire.setAnswer(updateQuestionnaire.getAnswer());

        surveyAnswerTableRepository.save(oldQuestionnaire);
    }

    @Override
    public void deleteRecordById(long id) {
        surveyAnswerTableRepository.deleteById(id);
    }

    @Override
    public List<SurveyAnswer> findByTargetId(UUID targetId) {
        return surveyAnswerTableRepository.findAllByTargetId(targetId);
    }
}
