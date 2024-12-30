package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeycloakUserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findUserEntityByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findAllByRealmId(String realmId);

    // Метод для поиска пользователя по ID
    Optional<UserEntity> findById(String userId);
}

