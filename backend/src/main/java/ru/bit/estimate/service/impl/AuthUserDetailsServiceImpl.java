package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.bit.estimate.keycloak.repository.KeycloakUserRepository;

/**
 * Implementation of the {@link UserDetailsService} interface for loading user-specific data.
 * @author Matushkin Anton
 */
@Service
@RequiredArgsConstructor
public class AuthUserDetailsServiceImpl implements UserDetailsService {

    @NonNull
    private final KeycloakUserRepository keycloakUserRepository;


    /**
     * Loads the user by their username.
     * @param username The username identifying the user whose data is required.
     * @return A fully populated user record (never null).
     * @throws UsernameNotFoundException If the user could not be found or the user has no GrantedAuthority.
     */
    @Override
    public UserDetails loadUserByUsername(String username) {
        return keycloakUserRepository.findUserEntityByUsername(username);
    }

}