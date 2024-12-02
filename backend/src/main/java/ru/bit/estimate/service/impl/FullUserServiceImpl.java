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
import java.util.Optional;

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
        UserEntity user = findUserByIdSafe(id).orElse(null);
        if (user == null) return null; // Пропускаем, если пользователя нет

        Optional<KeycloakGroup> groupOpt = getUserGroupSafe(user);
        if (groupOpt.isEmpty()) return null; // Пропускаем, если группа не найдена

        KeycloakGroup group = groupOpt.get();
        UserEntity boss = findUserByGroupIdSafe(group.getParentGroup()).orElse(null);
        KeycloakGroup bossGroup = boss != null ? getUserGroupSafe(boss).orElse(null) : null;

        List<KeycloakGroup> allServitorsGroup = getServitorGroupsSafe(group);
        List<UserEntity> servitorsEntity = getUsersByGroupIds(extractGroupIds(allServitorsGroup));
        List<ReducedUser> reducedServitorsList = servitorsEntity.stream()
                .map(servitor -> getUserGroupSafe(servitor)
                        .map(group1 -> ReducedUser.toDTO(servitor, group1))
                        .orElse(null)
                )
                .filter(reducedUser -> reducedUser != null) // Убираем null из результатов
                .toList();

        ReducedUser reducedUser = ReducedUser.toDTO(user, group);
        ReducedUser reducedBoss = boss != null && bossGroup != null ? ReducedUser.toDTO(boss, bossGroup) : null;

        return FullUser.toDto(reducedUser, reducedBoss, reducedServitorsList);
    }

    @Override
    public ReducedUser getReducedById(String id) {
        UserEntity user = findUserByIdSafe(id).orElse(null);
        if (user == null) return null;

        return getUserGroupSafe(user)
                .map(group -> ReducedUser.toDTO(user, group))
                .orElse(null);
    }

    @Override
    public List<ReducedUser> getAllReducedUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return allUsers.stream()
                .map(user -> getUserGroupSafe(user)
                        .map(group -> ReducedUser.toDTO(user, group))
                        .orElse(null)
                )
                .filter(reducedUser -> reducedUser != null) // Убираем null из результатов
                .toList();
    }

    private Optional<UserEntity> findUserByIdSafe(String userId) {
        return userRepository.findById(userId);
    }

    private Optional<KeycloakGroup> getUserGroupSafe(UserEntity user) {
        try {
            UserGroupMembership userGroupMembership = userGroupMembershipRepository.getUserGroupByUserId(user.getId());
            return groupRepository.findById(userGroupMembership.getGroupId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private Optional<UserEntity> findUserByGroupIdSafe(String groupId) {
        try {
            UserGroupMembership userGroupMembership = userGroupMembershipRepository.findById(groupId).orElseThrow();
            return userRepository.findById(userGroupMembership.getUserId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private List<KeycloakGroup> getServitorGroupsSafe(KeycloakGroup group) {
        try {
            return groupRepository.findAllByParentGroup(group.getId());
        } catch (Exception e) {
            return List.of();
        }
    }

    private List<UserEntity> getUsersByGroupIds(List<String> groupIds) {
        return groupIds.stream()
                .map(this::findUserByGroupIdSafe)
                .flatMap(Optional::stream)
                .toList();
    }

    private List<String> extractGroupIds(List<KeycloakGroup> groups) {
        return groups.stream()
                .map(KeycloakGroup::getId)
                .toList();
    }
}
