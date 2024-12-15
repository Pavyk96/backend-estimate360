package ru.bit.estimate.service;

import ru.bit.estimate.dto.StatisticsDTO;

import java.util.List;
import java.util.UUID;

public interface StatisticsService {

    List<StatisticsDTO> getStatisticsByUserId(UUID userId);

}
