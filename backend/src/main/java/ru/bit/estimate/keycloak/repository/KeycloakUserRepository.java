package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.UserEntity;

import java.util.Optional;

@Repository
public interface KeycloakUserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findUserEntityByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

}
