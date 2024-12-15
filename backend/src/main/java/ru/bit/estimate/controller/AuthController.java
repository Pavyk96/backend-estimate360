package ru.bit.estimate.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${keycloak.token-url}")
    private String keycloakTokenUrl;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.redirect-uri}")
    private String redirectUri;

    @PostMapping("/callback")
    public ResponseEntity<?> handleCallback(@RequestBody Map<String, String> payload) {
        String authorizationCode = payload.get("code");
        if (authorizationCode == null || authorizationCode.isEmpty()) {
            return ResponseEntity.badRequest().body("Authorization code is missing");
        }

        try {
            // Отправка запроса в Keycloak для обмена authorization_code на токены
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("code", authorizationCode);
            body.add("redirect_uri", redirectUri);
            body.add("client_id", clientId);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(keycloakTokenUrl, request, Map.class);

            // Проверка успешности ответа от Keycloak
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> tokens = response.getBody();
                // Возврат токенов на фронтенд
                Map<String, Object> responsePayload = new HashMap<>();
                responsePayload.put("access_token", tokens.get("access_token"));
                responsePayload.put("id_token", tokens.get("id_token"));
                responsePayload.put("refresh_token", tokens.get("refresh_token"));
                return ResponseEntity.ok(responsePayload);
            } else {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Failed to retrieve tokens from Keycloak");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error exchanging code for tokens: " + e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> payload) {
        String refreshToken = payload.get("refresh_token");
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Refresh token is missing");
        }

        try {
            // Формирование запроса в Keycloak для обновления токенов
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "refresh_token");
            body.add("refresh_token", refreshToken);
            body.add("client_id", clientId);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(keycloakTokenUrl, request, Map.class);

            // Проверка успешности ответа от Keycloak
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> tokens = response.getBody();
                Map<String, Object> responsePayload = new HashMap<>();
                responsePayload.put("access_token", tokens.get("access_token"));
                responsePayload.put("refresh_token", tokens.get("refresh_token")); // обновляем refresh_token, если он изменился
                return ResponseEntity.ok(responsePayload);
            } else {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Failed to refresh tokens from Keycloak");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error refreshing tokens: " + e.getMessage());
        }
    }

}
