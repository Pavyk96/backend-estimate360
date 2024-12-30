package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.SurveyAnswer;

import java.util.List;
import java.util.UUID;

@Repository
public interface SurveyAnswerTableRepository extends JpaRepository<SurveyAnswer, UUID> {

    List<SurveyAnswer> findAllByTargetId(UUID targetId);

    void deleteAllByQuestionId(Long questionId);

    void deleteAllBySurveyId(Long surveyId);
}
