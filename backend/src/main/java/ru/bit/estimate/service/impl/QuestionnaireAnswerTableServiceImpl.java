package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.QuestionnaireAnswerTableRequest;
import ru.bit.estimate.model.QuestionnaireAnswerTable;
import ru.bit.estimate.repository.QuestionnaireAnswerTableRepository;
import ru.bit.estimate.service.QuestionnaireAnswerTableService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionnaireAnswerTableServiceImpl implements QuestionnaireAnswerTableService {

    @NonNull
    private final QuestionnaireAnswerTableRepository questionnaireRepository;

    public List<QuestionnaireAnswerTable> getRecord() {
        return questionnaireRepository.findAll();
    }

    public QuestionnaireAnswerTable getRecordById(long id) {
        return questionnaireRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Опросник не найден"));
    }

    public QuestionnaireAnswerTable createRecord(QuestionnaireAnswerTableRequest request) {
        return questionnaireRepository.save(QuestionnaireAnswerTableRequest.fromDto(request));
    }

    public void updateRecordById(QuestionnaireAnswerTableRequest request, long id) {
        QuestionnaireAnswerTable oldQuestionnaire = getRecordById(id);
        QuestionnaireAnswerTable updateQuestionnaire = QuestionnaireAnswerTableRequest.fromDto(request);

        oldQuestionnaire.setQuestionnaireId(updateQuestionnaire.getQuestionnaireId());
        oldQuestionnaire.setQuestionId(updateQuestionnaire.getQuestionId());
        oldQuestionnaire.setUserId(updateQuestionnaire.getUserId());
        oldQuestionnaire.setAnswer(updateQuestionnaire.getAnswer());

        questionnaireRepository.save(oldQuestionnaire);
    }

    public void deleteRecordById(long id) {
        questionnaireRepository.deleteById(id);
    }
}
