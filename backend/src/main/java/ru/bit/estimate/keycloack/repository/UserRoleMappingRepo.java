package ru.bit.estimate.keycloack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bit.estimate.keycloack.model.UserRoleMapping;

import java.util.UUID;

public interface UserRoleMappingRepo extends JpaRepository<UUID, UserRoleMapping> {
}
