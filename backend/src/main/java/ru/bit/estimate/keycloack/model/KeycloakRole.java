package ru.bit.estimate.keycloack.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "keycloak_role")
public class KeycloakRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "client_realm_constraint")
    private String clientRealmConstraint;

    @Column(name = "client_role")
    private Boolean clientRole;

    @Column(name = "description")
    private String description;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "realm_id", nullable = false)
    private String realmId;

    @Column(name = "client")
    private String client;

    @Column(name = "realm")
    private String realm;
}

