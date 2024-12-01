package ru.bit.estimate.dto;

import lombok.Builder;
import lombok.Data;
import ru.bit.estimate.keycloak.model.UserEntity;

import java.util.List;

@Builder
@Data
public class FullUser {
    private String name;
    private String surname;
    private String email;

    private String postId;
    private String bossId;
    private List<String> servitorsId;

    public static FullUser toDto(UserEntity user, String postId, UserEntity boss, List<String> servitors) {
        return FullUser.builder()
                .name(user.getFirstName())
                .surname(user.getLastName())
                .email(user.getEmail())

                .postId(postId)
                .bossId(boss.getId())
                .servitorsId(servitors)

                .build();
    }
}
