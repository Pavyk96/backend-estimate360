package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionnaireDTO {
    private UUID id;
    private UUID surveyId;
    private Long questionId;
    private UUID userId;
    private String answer;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
