package ru.bit.estimate.dto;

import lombok.*;
import ru.bit.estimate.model.Survey;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SurveyRequest {
    private String name;
    private String description;

    public static Survey fromDto(SurveyRequest questionnaireRequest) {
        return Survey.builder()
                .name(questionnaireRequest.getName())
                .description(questionnaireRequest.description)
                .build();
    }
}
