package ru.bit.estimate.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@Table(name = "user_to_survey")
@IdClass(UserSurveyId.class) // Указываем составной ключ
public class UserSurvey implements Serializable {

    @Id
    private String userId; // Часть составного ключа

    @Id
    private Long surveyId; // Часть составного ключа

}
