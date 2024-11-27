package ru.bit.estimate.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * Utility class for handling JWT operations such as generating and validating tokens.
 * @author Matushkin Anton
 */
@Component
@RequiredArgsConstructor
public class JWTUtil {

    @NonNull
    private ObjectMapper objectMapper;

    private PublicKey key;

    @Value("${keycloak.public-key}")
    private String publicKeyString;

    @PostConstruct
    private void init() {
        byte[] decodedKey = Base64.getDecoder().decode(publicKeyString);
        this.key = getPublicKeyFromBytes(decodedKey);
    }

    /**
     * Конвертация байтов в публичный ключ.
     * @param keyBytes Массив байтов публичного ключа.
     * @return Публичный ключ.
     */
    private RSAPublicKey getPublicKeyFromBytes(byte[] keyBytes) {
        try {
            java.security.KeyFactory keyFactory = java.security.KeyFactory.getInstance("RSA");
            java.security.spec.X509EncodedKeySpec keySpec = new java.security.spec.X509EncodedKeySpec(keyBytes);
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            throw new RuntimeException("Invalid public key", e);
        }
    }

    /**
     * Extracts the username from the given token.
     * @param token The token.
     * @return The username.
     */
    public String getUsernameFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        if (claims != null) return (String) claims.get("preferred_username");
        return null;
    }


    /**
     * Extracts realm access.
     * @param token The token.
     * @return The list of roles.
     */
    public List<String> geRealmRolesFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        if (claims != null) {
            return objectMapper.convertValue(((Map<String, String>)claims.get("realm_access")).get("roles"), List.class);
        }
        return null;

    }

    /**
     * Checks if the given token is expired.
     * @param token The token.
     * @return True if the token is expired, false otherwise.
     */
    public boolean isTokenExpired(String token) {
        return getClaimsFromToken(token).getExpiration().before(new Date());
    }

    /**
     * Validates the token against the user details.
     * @param token The token.
     * @param userDetails The user details.
     * @return True if the token is valid, false otherwise.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Extracts claims from the given token.
     * @param token The token.
     * @return The extracted claim.
     */
    public Claims getClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }

}
