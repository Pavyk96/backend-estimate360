package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.QuestionnaireRequest;
import ru.bit.estimate.model.Questionnaire;
import ru.bit.estimate.repositories.QuestionnaireRepo;
import ru.bit.estimate.service.interf.QuestionnaireService;

import java.util.List;

@Service
public class QuestionnaireServiceImpl implements QuestionnaireService {
    @Autowired
    QuestionnaireRepo repo;

    @Override
    public List<Questionnaire> getAllQuestionnaire() {
        return repo.findAll();
    }

    @Override
    public Questionnaire getQuestionnaireById(Long id) {
        return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Анкета не найдена"));
    }

    @Override
    public Questionnaire createQuestionnaire(QuestionnaireRequest questionnaireRequest) {
        return repo.save(QuestionnaireRequest.fromDto(questionnaireRequest));
    }

    @Override
    public Questionnaire updateQuestionnaireById(QuestionnaireRequest request, Long id) {
        var oldQuestionnaire = getQuestionnaireById(id);
        oldQuestionnaire.setName(request.getName());
        repo.save(oldQuestionnaire);
        return oldQuestionnaire;
    }

    @Override
    public void deleteQuestionnaireById(Long id) {
        repo.deleteById(id);
    }
}
