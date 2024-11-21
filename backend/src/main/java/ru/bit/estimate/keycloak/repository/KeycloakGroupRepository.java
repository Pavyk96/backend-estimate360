package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.KeycloakGroup;

@Repository
public interface KeycloakGroupRepository extends JpaRepository<KeycloakGroup, String> {

}