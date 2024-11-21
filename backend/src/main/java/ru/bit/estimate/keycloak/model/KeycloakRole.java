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
@Table(name = "keycloak_role")
public class KeycloakRole {

    @Id
    private String id;

    @Column(name = "client_realm_constraint")
    private String clientRealmConstraint;

    @Column(name = "client_role")
    private String clientRole;

    private String description;

    private String name;

    @Column(name = "realm_id")
    private String realmId;

    private String client;

    private String realm;

}
