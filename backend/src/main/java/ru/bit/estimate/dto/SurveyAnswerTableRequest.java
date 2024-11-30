package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.bit.estimate.model.SurveyAnswerTable;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SurveyAnswerTableRequest {
    private UUID surveyId;
    private Long questionId;
    private UUID userId;
    private String answer;

    public static SurveyAnswerTable fromDto(SurveyAnswerTableRequest questionnaireRequest) {
        return SurveyAnswerTable.builder()
                .surveyId(questionnaireRequest.getSurveyId())
                .questionId(questionnaireRequest.getQuestionId())
                .userId(questionnaireRequest.getUserId())
                .answer(questionnaireRequest.getAnswer())
                .build();
    }
}
