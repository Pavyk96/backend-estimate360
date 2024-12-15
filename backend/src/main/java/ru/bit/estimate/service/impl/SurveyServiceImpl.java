package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.repository.SurveyRepository;
import ru.bit.estimate.service.SurveyService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    @NonNull
    private final SurveyRepository repo;

    @Override
    public List<Survey> getAllSurveys() {
        return repo.findAll();
    }

    @Override
    public Survey getSurveysById(Long id) {
        return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Анкета не найдена"));
    }

    @Override
    public Survey createSurveys(SurveyRequest surveyRequest) {
        return repo.save(SurveyRequest.fromDto(surveyRequest));
    }

    @Override
    public Survey updateSurveysById(SurveyRequest request, Long id) {
        var oldQuestionnaire = getSurveysById(id);
        oldQuestionnaire.setName(request.getName());
        oldQuestionnaire.setDescription(request.getDescription());
        repo.save(oldQuestionnaire);
        return oldQuestionnaire;
    }

    @Override
    public void deleteSurveysById(Long id) {
        repo.deleteById(id);
    }
}
