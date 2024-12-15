package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.keycloak.model.UserEntity;
import ru.bit.estimate.keycloak.repository.KeycloakUserRepository;
import ru.bit.estimate.service.UserEntityService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserEntityServiceImpl implements UserEntityService {

    @NonNull
    private final KeycloakUserRepository repo;

    @Override
    public List<UserEntity> getAllUserEntity() {
        return repo.findAll();
    }

}
