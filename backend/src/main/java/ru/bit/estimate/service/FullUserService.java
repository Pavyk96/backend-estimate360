package ru.bit.estimate.service;

import ru.bit.estimate.dto.FullUser;
import ru.bit.estimate.dto.ReducedUser;

public interface FullUserService {
    FullUser getFullById(String id);
    ReducedUser getReducedById(String id);
}
