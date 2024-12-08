package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.bit.estimate.model.UserSurvey;
import ru.bit.estimate.service.UserSurveyService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserSurveyController {

    @NonNull
    private final UserSurveyService service;

    @Operation(
            summary = "посмотреть все назначенные анкеты"
    )
    @GetMapping("/users-surveys")
    public List<UserSurvey> getAll() {
        return service.getAll();
    }

    //TODO: назначить всем пользователям
    @Operation(
            summary = "назначить анкету всем пользователям"
    )
    @PostMapping("/all-users-surveys/{id}")
    public List<UserSurvey> setAllUsersSurvey(@PathVariable Long id) {
        service.setAll(id);
        return service.getAll();
    }

    //TODO: просмотреть анкеты конкретного пользователя
    @Operation(
            summary = "просмотреть анкеты конкретного пользователя"
    )
    @GetMapping("/users-surveys/{id}")
    public List<UserSurvey> getUserSurveysByIdUser(@PathVariable String id) {
        return service.getUsersSurvey(id);
    }

    //TODO: удалить анкету назначенную пользователю
    @Operation(
            summary = "убрать конкретную анкету с конкретного пользователя"
    )
    @DeleteMapping("/users-survey/{user_id}/{survey_id}")
    public void deleteUsersSurvey(@PathVariable String user_id, @PathVariable Long survey_id) {
        service.deleteUsersSurvey(user_id, survey_id);
    }

    @Operation(
            summary = "назначить конкретному пользователю конкретную анкету"
    )
    @PostMapping("/users-surveys")
    public UserSurvey createUserSurvey(@RequestBody UserSurvey request) {
        return service.createUserSurvey(request);
    }
}
