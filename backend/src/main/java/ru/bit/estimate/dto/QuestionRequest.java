package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.bit.estimate.model.Question;

@Data
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

