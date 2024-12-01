package ru.bit.estimate.keycloak.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_group_membership")
public class UserGroupMembership {

    @Id
    @Column(name = "group_id")
    private String groupId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "membership_type")
    private String membershipType;
}