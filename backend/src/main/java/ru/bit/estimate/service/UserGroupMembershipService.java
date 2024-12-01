package ru.bit.estimate.service;

import ru.bit.estimate.keycloak.model.UserGroupMembership;

import java.util.List;

public interface UserGroupMembershipService {
    List<UserGroupMembership> getAll();
}
