package ru.bit.estimate.keycloak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.bit.estimate.keycloak.model.UserGroupMembership;

import java.util.List;

@Repository
public interface UserGroupMembershipRepository extends JpaRepository<UserGroupMembership, String> {

    @Query("SELECT u FROM UserGroupMembership u WHERE u.userId = :userId")
    UserGroupMembership getUserGroupByUserId(@Param("userId") String userId);

    @Query("SELECT u.userId FROM UserGroupMembership u WHERE u.groupId IN :groupIds")
    List<String> getUserIdsByGroupIds(@Param("groupIds") List<String> groupIds);

}




