package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.UserRoleMapping;
import ru.bit.estimate.keycloak.model.UserRoleMappingId;

import java.util.List;

@Repository
public interface UserRoleMappingRepository extends JpaRepository<UserRoleMapping, UserRoleMappingId> {

    List<UserRoleMapping> findUserRoleMappingByUserId(String userId);

}
