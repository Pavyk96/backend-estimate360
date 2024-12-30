package ru.bit.estimate.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.repository.SurveyAnswerTableRepository;
import ru.bit.estimate.repository.SurveyRepository;
import ru.bit.estimate.service.SurveyService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    @NonNull
    private final SurveyRepository repo;

    @NonNull
    private final SurveyAnswerTableRepository answerTableRepository;

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
    @Transactional
    public void deleteSurveysById(Long id) {
        // Удаляем все ответы, связанные с опросом
        answerTableRepository.deleteAllBySurveyId(id);

        // Удаляем сам опрос
        repo.deleteById(id);
    }

    @Override
    public Survey setArchiveById(Long id) {
        Survey survey = getSurveysById(id);
        survey.setIsArchive(true); // Изменяем поле
        return repo.save(survey); // Сохраняем изменения
    }

    @Override
    public Survey anSetArchiveById(Long id) {
        Survey survey = getSurveysById(id);
        survey.setIsArchive(false); // Изменяем поле
        return repo.save(survey); // Сохраняем изменения
    }


}
