package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.SurveyAnswerTable;

@Repository
public interface SurveyAnswerTableRepository extends JpaRepository<SurveyAnswerTable, Long> {
}
