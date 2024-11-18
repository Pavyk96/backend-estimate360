package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.KeycloakRole;

@Repository
public interface KeycloakRolesRepository extends JpaRepository<KeycloakRole, String> {

}
