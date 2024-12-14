package ru.bit.estimate.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserSurveyId implements Serializable {
    private String userId;
    private Long surveyId;

    // Конструктор по умолчанию (обязателен для Hibernate)
    public UserSurveyId() {}

    public UserSurveyId(String userId, Long surveyId) {
        this.userId = userId;
        this.surveyId = surveyId;
    }
}
