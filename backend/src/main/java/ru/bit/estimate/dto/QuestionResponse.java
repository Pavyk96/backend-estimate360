package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.bit.estimate.model.Question;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
