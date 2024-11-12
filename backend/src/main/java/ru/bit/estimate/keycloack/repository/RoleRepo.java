package ru.bit.estimate.keycloack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bit.estimate.keycloack.model.KeycloakRole;

import java.util.UUID;

public interface RoleRepo extends JpaRepository<UUID, KeycloakRole> {
}
