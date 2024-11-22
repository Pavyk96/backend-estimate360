package ru.bit.estimate.controller;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import ru.bit.estimate.dto.AuthDTO;

@Setter
@RestController
public class AuthController {

    @Value("${client-id}")
    private String clientId;

    @Value("${resource-url}")
    private String resourceServerUrl;

    @Value("${grant-type}")
    private String grantType;

    @GetMapping("/auth")
    public String auth(@RequestBody AuthDTO authDTO) {
        var header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        var body = "client_id=" + clientId
                + "&username=" + authDTO.login()
                + "&password=" + authDTO.password()
                + "&grant_type=" + grantType;

        var requestEntity = new HttpEntity<>(body, header);
        var restTemplate = new RestTemplate();
        var response = restTemplate.exchange(
                resourceServerUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        if (response.getStatusCode().value() == 200) {
            return response.getBody();
        }
        return null;
    }
}
