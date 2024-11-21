package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.UserEntity;

@Repository
public interface KeycloakUserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findUserEntityByUsername(String username);

}
