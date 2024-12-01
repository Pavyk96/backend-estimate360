package ru.bit.estimate.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bit.estimate.keycloak.model.UserGroupMembership;
import ru.bit.estimate.service.UserGroupMembershipService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserGroupMembershipController {
    @NonNull
    private final UserGroupMembershipService service;

    @GetMapping("/posts")
    public List<UserGroupMembership> getAll() {
        return service.getAll();
    }
}
