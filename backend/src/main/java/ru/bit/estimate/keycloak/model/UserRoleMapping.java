package ru.bit.estimate.keycloak.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UserRoleMappingId.class)
@Table(name = "user_role_mapping")
public class UserRoleMapping {

    @Id
    @Column(name = "role_id")
    private String roleId;

    @Id
    @Column(name = "user_id")
    private String userId;

}
