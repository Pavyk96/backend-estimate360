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
    private String description;

    public static Questionnaire fromDto(QuestionnaireRequest questionnaireRequest) {
        return Questionnaire.builder()
                .name(questionnaireRequest.getName())
                .description(questionnaireRequest.description)
                .build();
    }
}
