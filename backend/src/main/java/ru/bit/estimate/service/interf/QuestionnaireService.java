package ru.bit.estimate.service.interf;

import ru.bit.estimate.dto.QuestionnaireRequest;
import ru.bit.estimate.model.Questionnaire;

import java.util.List;

public interface QuestionnaireService {
    List<Questionnaire> getAllQuestionnaire();
    Questionnaire getQuestionnaireById(Long id);
    Questionnaire createQuestionnaire(QuestionnaireRequest questionnaireRequest);
    Questionnaire updateQuestionnaireById(QuestionnaireRequest request, Long id);
    void deleteQuestionnaireById(Long id);
}
