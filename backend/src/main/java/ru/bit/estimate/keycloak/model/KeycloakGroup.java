package ru.bit.estimate.keycloak.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "keycloak_group")
public class KeycloakGroup {


    @Id
    private String id;

    private String name;

    @Column(name = "parent_group")
    private String parentGroup;

    @Column(name = "realm_id")
    private String realmId;

    private int type;

}
