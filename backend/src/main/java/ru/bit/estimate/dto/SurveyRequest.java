package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.bit.estimate.model.Survey;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
