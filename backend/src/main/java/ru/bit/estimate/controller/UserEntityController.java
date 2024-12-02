package ru.bit.estimate.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.keycloak.model.UserEntity;
import ru.bit.estimate.keycloak.model.UserGroupMembership;
import ru.bit.estimate.service.UserEntityService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserEntityController {

    @NonNull
    private final UserEntityService service;

    @Operation(
            summary = "Получить всю техническую информацию о пользателях"
    )
    @GetMapping("/users")
    public List<UserEntity> getAllUsers() {
        return service.getAllUserEntity();
    }
}
