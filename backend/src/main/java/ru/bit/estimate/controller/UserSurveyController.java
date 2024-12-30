package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.dto.StatisticsDTO;
import ru.bit.estimate.dto.SurveyQuestionResponse;
import ru.bit.estimate.dto.SurveyRequest;
import ru.bit.estimate.model.UserSurvey;
import ru.bit.estimate.service.StatisticsService;
import ru.bit.estimate.service.UserSurveyService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserSurveyController {

    @NonNull
    private final UserSurveyService userSurveyService;

    @NonNull
    private final StatisticsService statisticsService;

    @Operation(
            summary = "посмотреть все назначенные анкеты"
    )
    @GetMapping("/users-surveys")
    public List<UserSurvey> getAll() {
        return userSurveyService.getAll();
    }

    @Operation(
            summary = "назначить анкету всем пользователям"
    )
    @PostMapping("/all-users-surveys/{id}/{realmId}")
    public List<UserSurvey> setAllUsersSurvey(@PathVariable Long id, @PathVariable String realmId) {
        userSurveyService.setAll(id, realmId);
        return userSurveyService.getAll();
    }

    @Operation(
            summary = "просмотреть анкеты конкретного пользователя"
    )
    @GetMapping("/users-surveys/{id}")
    public List<UserSurvey> getUserSurveysByIdUser(@PathVariable String id) {
        return userSurveyService.getUsersSurvey(id);
    }

    @Operation(
            summary = "убрать конкретную анкету с конкретного пользователя"
    )
    @DeleteMapping("/users-surveys/{userId}/{surveyId}")
    public void deleteUsersSurvey(@PathVariable String userId, @PathVariable Long surveyId) {
        userSurveyService.deleteUsersSurvey(userId, surveyId);
    }

    @Operation(
            summary = "назначить конкретному пользователю конкретную анкету"
    )
    @PostMapping("/users-surveys")
    public UserSurvey createUserSurvey(@RequestBody UserSurvey request) {
        return userSurveyService.createUserSurvey(request);
    }

    @GetMapping("/all-users-surveys/{id}")
    public List<UserSurvey> getAllStudentBySurveyId(@PathVariable Long id) {
        return userSurveyService.getAllStudentBySurveyId(id);
    }

    @Operation(
            summary = "Вывести статистику по пользователю"
    )
    @GetMapping("/statistics/{userId}")
    public ResponseEntity<List<StatisticsDTO>> getStatistics(@PathVariable UUID userId) {
        return ResponseEntity.ok(statisticsService.getStatisticsByUserId(userId));
    }

    @GetMapping("users-surveys/active")
    public List<Long> getAllActiveSurveys() {
        return userSurveyService.getAllActiveSurveys();
    }

}
