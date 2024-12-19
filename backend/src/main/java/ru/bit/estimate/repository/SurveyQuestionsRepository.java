package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.Question;
import ru.bit.estimate.model.Survey;
import ru.bit.estimate.model.SurveyQuestions;

import java.util.List;
import java.util.Optional;

@Repository
public interface SurveyQuestionsRepository extends JpaRepository<SurveyQuestions, Long> {

    @Query("SELECT sq FROM SurveyQuestions sq WHERE sq.survey.id = :surveyId")
    List<SurveyQuestions> findAllBySurveyId(@Param("surveyId") Long surveyId);

    boolean existsBySurveyAndQuestion(Survey survey, Question question);

    void deleteAllBySurveyId(Long surveyId);

    @Query("SELECT sq.question FROM SurveyQuestions sq WHERE sq.survey = :survey")
    List<Question> findAllQuestionsBySurvey(@Param("survey") Survey survey);

    Optional<SurveyQuestions> findBySurveyAndQuestion(Survey survey, Question question);

    @Query("SELECT DISTINCT sq.survey FROM SurveyQuestions sq")
    List<Survey> findAllDistinctSurveys();

}
