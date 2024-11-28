package ru.bit.estimate.dto;

import lombok.*;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.model.Questionnaire;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequest {
    private String question;
    private String type;

    public static Question fromDto(QuestionRequest questionRequest) {
        return Question.builder()
                .question(questionRequest.getQuestion())
                .type(questionRequest.getType())
                .build();
    }
}

