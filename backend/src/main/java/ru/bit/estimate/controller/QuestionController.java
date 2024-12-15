package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.dto.QuestionRequest;
import ru.bit.estimate.dto.QuestionResponse;
import ru.bit.estimate.service.QuestionService;

import java.util.List;

@Tag(name = "questions_methods")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuestionController {

    @NonNull
    private final QuestionService questionService;

    @Operation(
            summary = "Получить все вопросы"
    )
    @GetMapping("/questions")
    public List<QuestionResponse> getAllQuestion() {
        return questionService.getAllQuestions();
    }

    @Operation(
            summary = "Получить вопрос по id",
            description = "Принимает id вопроса, который нужно получить"
    )
    @GetMapping("/questions/{id}")
    public QuestionResponse getQuestionByID(@PathVariable long id) {
        return questionService.getQuestionByID(id);
    }

    @Operation(
            summary = "Создать вопрос",
            description = "Принимает ДТО вопроса (вопрос, тип вопроса)"
    )
    @PostMapping("/questions")
    public QuestionResponse createQuestion(@RequestBody QuestionRequest question) {
        return questionService.createQuestion(question);
    }

    @Operation(
            summary = "Изменить вопрос по id",
            description = "Принимает ДТО вопроса (вопрос, тип вопроса), id вопроса, который нужно изменить"
    )
    @PutMapping("/questions/{id}")
    public QuestionResponse updateQuestionByID(@RequestBody QuestionRequest question, @PathVariable long id) {
        return questionService.updateQuestionByID(question, id);
    }

    @Operation(
            summary = "Удалить вопрос по id"
    )
    @DeleteMapping("/questions/{id}")
    public void deleteQuestionByID(@PathVariable long id) {
        questionService.deleteQuestionByID(id);
    }

}
