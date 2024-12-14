package ru.bit.estimate.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@Data
@Table(name = "user_to_survey")
@IdClass(UserSurveyId.class) // Указываем составной ключ
public class UserSurvey implements Serializable {

    @Id
    private String userId; // Часть составного ключа

    @Id
    private Long surveyId; // Часть составного ключа
}