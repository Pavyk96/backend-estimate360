package ru.bit.estimate.dto;

import lombok.*;
import ru.bit.estimate.model.Questionnaire;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionnaireRequest {
    private String name;

    public static Questionnaire fromDto(QuestionnaireRequest questionnaireRequest) {
        return Questionnaire.builder()
                .name(questionnaireRequest.getName())
                .build();
    }
}
