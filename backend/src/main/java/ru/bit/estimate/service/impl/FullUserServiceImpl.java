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

import java.security.Key;
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
        UserEntity user = findUserById(id);
        KeycloakGroup group = getUserGroup(user);

        UserEntity boss = getUserByGroupId(group.getParentGroup());
        KeycloakGroup bossGroup = getUserGroup(boss);

        List<KeycloakGroup> allServitorsGroup = getServitorGroups(group); //все подчиненные профессии

        List<UserEntity> servitorsEntity = getUsersByGroupIds(extractGroupIds(allServitorsGroup)); //все подчиненные
        List<KeycloakGroup> servitorsGroup = servitorsEntity.stream() //все професии подчиненных
                .map(this::getUserGroup)
                .toList();

        ReducedUser reducedUser = ReducedUser.toDTO(user, group);
        ReducedUser reducedBoss = ReducedUser.toDTO(boss, bossGroup);
        List<ReducedUser> reducedServitorsList = servitorsEntity.stream()
                .map(servitor -> {
                    KeycloakGroup servitorGroup = getUserGroup(servitor); // Получаем группу для текущего подчиненного
                    return ReducedUser.toDTO(servitor, servitorGroup); // Создаем ReducedUser
                })
                .toList();

        return FullUser.toDto(reducedUser, reducedBoss, reducedServitorsList);
    }

    @Override
    public ReducedUser getReducedById(String id) {
        UserEntity user = findUserById(id);
        KeycloakGroup group = getUserGroup(user);
        return ReducedUser.toDTO(user, group);
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

    private List<UserEntity> getUsersByGroupIds(List<String> groupIds) {
        return groupIds.stream()
                .map(this::getUserByGroupIdSafe) // Используем безопасный метод
                .flatMap(Optional::stream) // Убираем пустые значения (если Optional пуст)
                .toList();
    }

    private Optional<UserEntity> getUserByGroupIdSafe(String id) {
        try {
            UserGroupMembership userGroupMembership = userGroupMembershipRepository.findById(id).orElseThrow();
            return userRepository.findById(userGroupMembership.getUserId());
        } catch (Exception e) {
            return Optional.empty(); // Если ошибка, возвращаем пустой Optional
        }
    }



    private List<String> extractGroupIds(List<KeycloakGroup> groups) {
        return groups.stream()
                .map(KeycloakGroup::getId)
                .toList();
    }



}
