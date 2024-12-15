package ru.bit.estimate.dto;

import lombok.Data;

import java.util.List;

@Data
public class SurveyQuestionRequest {

    private Long surveyId;
    private List<Long> questionIdList;

}
