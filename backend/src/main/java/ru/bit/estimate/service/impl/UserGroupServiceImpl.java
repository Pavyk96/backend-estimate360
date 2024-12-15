package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.keycloak.model.UserGroupMembership;
import ru.bit.estimate.keycloak.repository.UserGroupMembershipRepository;
import ru.bit.estimate.service.UserGroupMembershipService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserGroupServiceImpl implements UserGroupMembershipService {

    @NonNull
    private final UserGroupMembershipRepository repository;

    @Override
    public List<UserGroupMembership> getAll() {
        return repository.findAll();
    }

}
