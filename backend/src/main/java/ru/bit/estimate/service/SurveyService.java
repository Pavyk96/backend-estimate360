package ru.bit.estimate.service;

import org.springframework.web.bind.annotation.PathVariable;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.Survey;

import java.util.List;

public interface SurveyService {

    List<Survey> getAllSurveys();

    Survey getSurveysById(Long id);

    Survey createSurveys(SurveyRequest surveyRequest);

    Survey updateSurveysById(SurveyRequest request, Long id);

    void deleteSurveysById(Long id);

    Survey setArchiveById(Long id);

    Survey anSetArchiveById(Long id);

}
