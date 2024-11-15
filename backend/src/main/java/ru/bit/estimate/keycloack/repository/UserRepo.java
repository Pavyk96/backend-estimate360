package ru.bit.estimate.keycloack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bit.estimate.keycloack.model.UserEntity;

import java.util.UUID;

public interface UserRepo extends JpaRepository<UserEntity, UUID> {
}
