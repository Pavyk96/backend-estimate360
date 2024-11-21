package ru.bit.estimate.service;

import ru.bit.estimate.keycloak.model.UserEntity;

import java.util.List;

public interface UserEntityService {
    List<UserEntity> getAllUserEntity();
}
