package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.dto.FullUser;
import ru.bit.estimate.dto.ReducedUser;
import ru.bit.estimate.service.FullUserService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FullUserController {
    @NonNull
    private final FullUserService service;

    @Operation(
            summary = "Получить всю информацию о пользователе по его id"
    )
    @GetMapping("/full-users/{id}")
    public FullUser getFullUserById(@PathVariable String id) {
        return service.getFullById(id);
    }

    @Operation(
            summary = "Получить сокращенную информацию о пользователе по его id"
    )
    @GetMapping("/reduced-users/{id}")
    public ReducedUser getReducedUserById(@PathVariable String id) {
        return service.getReducedById(id);
    }

    @Operation(
            summary = "Получить всю сокращенную информацию о всех пользователях"
    )
    @GetMapping("/reduced-users")
    public List<ReducedUser> getAllReducedUsers() {
        return service.getAllReducedUsers();
    }
}
