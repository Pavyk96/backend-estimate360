package ru.bit.estimate.dto;

import lombok.Builder;
import lombok.Data;
import ru.bit.estimate.keycloak.model.KeycloakGroup;
import ru.bit.estimate.keycloak.model.UserEntity;

@Data
@Builder
public class ReducedUserDTO {

    private String id;
    private String name;
    private String surname;
    private String email;
    private String post;

    public static ReducedUserDTO toDTO(UserEntity user, KeycloakGroup group) {
        return ReducedUserDTO.builder()
                .id(user.getId())
                .name(user.getFirstName())
                .surname(user.getLastName())
                .email(user.getEmail())
                .post(group.getName())
                .build();
    }

}
