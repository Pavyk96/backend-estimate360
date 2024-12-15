package ru.bit.estimate.dto;

import lombok.*;
import ru.bit.estimate.model.Question;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
    private Long id;
    private String question;
    private String type;
    private boolean isAnswerScoreIsReversed;

    public static QuestionResponse toDTO(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .question(question.getQuestion())
                .type(question.getType())
                .isAnswerScoreIsReversed(question.isAnswerScoreReversed())
                .build();
    }
}
