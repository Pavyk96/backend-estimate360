package ru.bit.estimate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.Questionnaire;

@Repository
public interface QuestionnaireRepo extends JpaRepository<Questionnaire, Long> {
}
