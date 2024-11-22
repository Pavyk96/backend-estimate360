package ru.bit.estimate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/auth").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/questionnaires").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/questions").permitAll()

                                .requestMatchers(HttpMethod.PUT, "api/questionnaires").hasRole("HR")
                                .requestMatchers(HttpMethod.POST, "api/questionnaires").hasRole("HR")
                                .requestMatchers(HttpMethod.DELETE, "api/questionnaires").hasRole("HR")

                                .requestMatchers(HttpMethod.PUT, "api/questions").hasRole("HR")
                                .requestMatchers(HttpMethod.POST, "api/questions").hasRole("HR")
                                .requestMatchers(HttpMethod.DELETE, "api/questions").hasRole("HR")
                                .anyRequest().authenticated()
                ).sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ).oauth2ResourceServer(
                        resourceServer -> resourceServer.jwt(
                                jwtConvertor -> jwtConvertor.jwtAuthenticationConverter(
                                    keycloakAuthConverter()
                                )
                        )
                )
                .build();
    }

    private Converter<Jwt,? extends AbstractAuthenticationToken> keycloakAuthConverter() {
        var converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(
                new AuthoritiesConverter()
        );

        return converter;
    }
}