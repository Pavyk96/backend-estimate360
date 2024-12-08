package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bit.estimate.model.UserSurvey;
import ru.bit.estimate.model.UserSurveyId;

import java.util.List;

public interface UserSurveyRepo extends JpaRepository<UserSurvey, UserSurveyId> {
    // Метод для поиска всех записей по userId
    List<UserSurvey> findByUserId(String userId);

    // Дополнительные методы
    boolean existsByUserIdAndSurveyId(String userId, Long surveyId);

    void deleteByUserIdAndSurveyId(String userId, Long surveyId);
}
