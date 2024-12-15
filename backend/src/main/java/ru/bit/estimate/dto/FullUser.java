package ru.bit.estimate.dto;

import lombok.Builder;
import lombok.Data;
import ru.bit.estimate.keycloak.model.UserEntity;

import java.util.List;

@Builder
@Data
public class FullUser {
    private ReducedUser user;
    private List<ReducedUser> chiefs;
    private List<ReducedUser> subordinates;

    public static FullUser toDto(ReducedUser reducedUser, List<ReducedUser> boss, List<ReducedUser> servitors) {
        return FullUser.builder()
                .user(reducedUser)
                .chiefs(boss)
                .subordinates(servitors)
                .build();
    }
}
