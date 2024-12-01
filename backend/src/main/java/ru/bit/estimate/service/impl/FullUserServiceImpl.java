package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.FullUser;
import ru.bit.estimate.dto.ReducedUser;
import ru.bit.estimate.keycloak.model.KeycloakGroup;
import ru.bit.estimate.keycloak.model.UserEntity;
import ru.bit.estimate.keycloak.model.UserGroupMembership;
import ru.bit.estimate.keycloak.repository.KeycloakGroupRepository;
import ru.bit.estimate.keycloak.repository.KeycloakUserRepository;
import ru.bit.estimate.keycloak.repository.UserGroupMembershipRepository;
import ru.bit.estimate.service.FullUserService;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FullUserServiceImpl implements FullUserService {
    @NonNull
    private final KeycloakUserRepository userRepository;

    @NonNull
    private final KeycloakGroupRepository groupRepository;

    @NonNull
    private final UserGroupMembershipRepository userGroupMembershipRepository;

    @Override
    public FullUser getFullById(String id) {
        UserEntity user = findUserById(id);
        KeycloakGroup group = getUserGroup(user);
        String postId = group.getId();
        UserEntity boss = getUserByGroupId(group.getParentGroup());

        List<KeycloakGroup> servitorsGroup = getServitorGroups(group);
        List<String> servitorsGroupIds = extractGroupIds(servitorsGroup);

        List<String> servitorsIdList = userGroupMembershipRepository.getUserIdsByGroupIds(servitorsGroupIds);

        return FullUser.toDto(user, postId, boss, servitorsIdList);
    }

    @Override
    public ReducedUser getReducedById(String id) {
        UserEntity user = findUserById(id);
        KeycloakGroup group = getUserGroup(user);
        String postId = group.getId();
        return ReducedUser.toDTO(user, postId, group);
    }

    private UserEntity findUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    private KeycloakGroup getUserGroup(UserEntity user) {
        UserGroupMembership userGroupMembership = userGroupMembershipRepository.getUserGroupByUserId(user.getId());
        return groupRepository.findById(userGroupMembership.getGroupId())
                .orElseThrow(() -> new RuntimeException("Группа пользователя не была найдена"));
    }



    private UserEntity getUserByGroupId(String id) {
        UserGroupMembership userGroupMembership = userGroupMembershipRepository.findById(id).orElseThrow();
        return userRepository.findById(userGroupMembership.getUserId()).orElseThrow();
    }

    private List<KeycloakGroup> getServitorGroups(KeycloakGroup group) {
        return groupRepository.findAllByParentGroup(group.getId());
    }


    private List<String> extractGroupIds(List<KeycloakGroup> groups) {
        return groups.stream()
                .map(KeycloakGroup::getId)
                .toList();
    }


    private List<UserEntity> getUsersByGroupIds(List<String> groupIds) {
        return groupIds.stream()
                .map(this::getUserByGroupId)
                .toList();
    }


}
