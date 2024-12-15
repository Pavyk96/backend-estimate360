package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.Survey;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
}
