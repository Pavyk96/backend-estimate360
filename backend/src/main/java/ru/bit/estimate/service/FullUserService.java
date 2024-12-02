package ru.bit.estimate.service;

import ru.bit.estimate.dto.FullUser;
import ru.bit.estimate.dto.ReducedUser;

import java.util.List;

public interface FullUserService {
    FullUser getFullById(String id);
    ReducedUser getReducedById(String id);
    List<ReducedUser> getAllReducedUsers();
}
