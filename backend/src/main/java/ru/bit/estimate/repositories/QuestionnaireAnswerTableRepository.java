package ru.bit.estimate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.QuestionnaireAnswerTable;

@Repository
public interface QuestionnaireAnswerTableRepository extends JpaRepository<QuestionnaireAnswerTable, Long> {
}
