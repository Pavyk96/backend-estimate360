package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.model.SurveyQuestions;

import java.util.List;

@Repository
public interface SurveyQuestionsRepo extends JpaRepository<SurveyQuestions, Long> {
    @Query("SELECT sq FROM SurveyQuestions sq WHERE sq.survey.id = :surveyId")
    List<SurveyQuestions> findAllBySurveyId(@Param("surveyId") Long surveyId);

    void deleteAllBySurveyId(Long surveyId);
}