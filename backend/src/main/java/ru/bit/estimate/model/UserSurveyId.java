package ru.bit.estimate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSurveyId implements Serializable {

    private String userId;
    private Long surveyId;

}
