package ru.bit.estimate.service;

import ru.bit.estimate.dto.SurveyQuestionRequest;
import ru.bit.estimate.dto.SurveyQuestionResponse;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.Question;

import java.util.List;

public interface SurveyQuestionService {
    List<SurveyQuestionResponse> getAll ();
    SurveyQuestionResponse getById(Long surveyId);
    SurveyQuestionResponse create(SurveyQuestionRequest request);
    SurveyQuestionResponse updateById(Long surveyId, SurveyQuestionRequest survey);
    void deleteById(Long surveyId);

}
