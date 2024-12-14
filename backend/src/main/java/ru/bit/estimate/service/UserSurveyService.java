package ru.bit.estimate.service;

import org.springframework.web.bind.annotation.PathVariable;
import ru.bit.estimate.model.UserSurvey;

import java.util.List;

public interface UserSurveyService {
    List<UserSurvey> getAll();
    UserSurvey createUserSurvey(UserSurvey request);
    void setAll (Long id);
    List<UserSurvey> getUsersSurvey(String id);
    void deleteUsersSurvey(String user_id, Long survey_id);
    List<UserSurvey> getAllStudentBySurveyId(Long id);
}
