package ru.bit.estimate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
