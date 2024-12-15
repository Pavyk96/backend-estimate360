package ru.bit.estimate.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class FullUserDTO {

    private ReducedUserDTO user;
    private List<ReducedUserDTO> chiefs;
    private List<ReducedUserDTO> subordinates;

    public static FullUserDTO toDto(ReducedUserDTO reducedUserDTO, List<ReducedUserDTO> boss, List<ReducedUserDTO> servitors) {
        return FullUserDTO.builder()
                .user(reducedUserDTO)
                .chiefs(boss)
                .subordinates(servitors)
                .build();
    }

}
