package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.bit.estimate.model.QuestionnaireAnswerTable;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionnaireAnswerTableRequest {
    private UUID questionnaireId;
    private Long questionId;
    private UUID userId;
    private String answer;

    public static QuestionnaireAnswerTable fromDto(QuestionnaireAnswerTableRequest questionnaireRequest) {
        return QuestionnaireAnswerTable.builder()
                .questionnaireId(questionnaireRequest.getQuestionnaireId())
                .questionId(questionnaireRequest.getQuestionId())
                .userId(questionnaireRequest.getUserId())
                .answer(questionnaireRequest.getAnswer())
                .build();
    }
}
