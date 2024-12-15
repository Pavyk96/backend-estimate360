package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.model.Survey;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyQuestionResponse {

    private Long id;
    private String name;
    private String description;
    private List<QuestionResponse> questionList;

    public static SurveyQuestionResponse toDTO(Survey survey, List<Question> questionList) {
        return SurveyQuestionResponse.builder()
                .id(survey.getId())
                .name(survey.getName())
                .description(survey.getDescription())
                .questionList(questionList.stream().map(QuestionResponse::toDTO).toList())
                .build();
    }

}
