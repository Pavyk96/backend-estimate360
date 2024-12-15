package ru.bit.estimate.service;

import ru.bit.estimate.model.UserSurvey;

import java.util.List;

public interface UserSurveyService {

    List<UserSurvey> getAll();

    UserSurvey createUserSurvey(UserSurvey request);

    void setAll(Long id);

    List<UserSurvey> getUsersSurvey(String id);

    void deleteUsersSurvey(String userId, Long surveyId);

    List<UserSurvey> getAllStudentBySurveyId(Long id);

}
