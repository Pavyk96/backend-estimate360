package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.bit.estimate.model.SurveyAnswer;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyAnswerTableRequest {
    private Long surveyId;
    private Long questionId;
    private UUID userId;
    private String answer;

    public static SurveyAnswer fromDto(SurveyAnswerTableRequest surveyAnswerTableRequest) {
        return SurveyAnswer.builder()
                .surveyId(surveyAnswerTableRequest.getSurveyId())
                .questionId(surveyAnswerTableRequest.getQuestionId())
                .userId(surveyAnswerTableRequest.getUserId())
                .answer(surveyAnswerTableRequest.getAnswer())
                .build();
    }
}
