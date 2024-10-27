package ru.bit.estimate.service;

import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.Question;
import ru.bit.estimate.dto.Questionnaire;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class QuestionService {

    List<Question> questions =new ArrayList<>(Arrays.asList(new Question(0, "вопрос?", "всякий"),
            new Question(1, "улыбнись если", "социальный"),
            new Question(2, "Что чееееее?", "+1823123123")));

    public List<Question> getAllQuestions() {
        return questions;
    }

    public Question getQuestionByID(long id) {
        for (var question : questions) {
            if (question.getId() == id) {
                return question;
            }
        }
        return null;
    }

    public void createQuestion(Question question) {
        questions.add(question);
    }

    public void updateQuestionByID(Question questionNew, long id) {
        for (var question : questions) {
            if (question.getId() == id) {
                questions.set(questions.indexOf(question), questionNew);
            }
        }
    }

    public void deleteQuestionByID(long id) {
        questions.removeIf(question -> question.getId() == id);
    }
}
