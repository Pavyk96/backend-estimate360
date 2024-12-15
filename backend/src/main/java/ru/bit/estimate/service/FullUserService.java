package ru.bit.estimate.service;

import ru.bit.estimate.dto.FullUserDTO;
import ru.bit.estimate.dto.ReducedUserDTO;

import java.util.List;

public interface FullUserService {

    FullUserDTO getFullById(String id);

    ReducedUserDTO getReducedById(String id);

    List<ReducedUserDTO> getAllReducedUsers();

}
