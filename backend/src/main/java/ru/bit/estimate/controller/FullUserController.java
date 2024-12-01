package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.dto.FullUser;
import ru.bit.estimate.dto.ReducedUser;
import ru.bit.estimate.service.FullUserService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FullUserController {
    @NonNull
    private final FullUserService service;

    @GetMapping("/full-users/{id}")
    public FullUser getFullUserById(@PathVariable String id) {
        return service.getFullById(id);
    }

    @GetMapping("/reduced-users/{id}")
    public ReducedUser getReducedUserById(@PathVariable String id) {
        return service.getReducedById(id);
    }
}
