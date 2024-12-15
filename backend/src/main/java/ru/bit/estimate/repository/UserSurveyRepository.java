package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bit.estimate.model.UserSurvey;
import ru.bit.estimate.model.UserSurveyId;

import java.util.List;

public interface UserSurveyRepository extends JpaRepository<UserSurvey, UserSurveyId> {

    List<UserSurvey> findByUserId(String userId);

    List<UserSurvey> findBySurveyId(Long surveyId);

    boolean existsByUserIdAndSurveyId(String userId, Long surveyId);

    void deleteByUserIdAndSurveyId(String userId, Long surveyId);

}
