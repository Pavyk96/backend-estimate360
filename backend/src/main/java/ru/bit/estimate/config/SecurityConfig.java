package ru.bit.estimate.config;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.bit.estimate.config.filter.JWTAuthenticationFilter;
import ru.bit.estimate.service.impl.AuthUserDetailsServiceImpl;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @NonNull
    private final AuthUserDetailsServiceImpl userDetailsService;

    @NonNull
    private final JWTAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Добавлено для разрешения CORS
                .authorizeHttpRequests(request ->
                        request.requestMatchers("/swagger-ui/**", "/v3/**", "api/auth", "api/records").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/questions", "/api/surveys", "/api/surveys-questions", "/api/users-surveys").permitAll()
                                .requestMatchers("/api/questions").hasAuthority("HR")
                                .requestMatchers("/api/surveys-questions").hasAuthority("HR")
                                .requestMatchers("/api/surveys").hasAuthority("HR")
                                .requestMatchers("/api/users").hasAuthority("HR")
                                .requestMatchers("/api/full-users").hasAuthority("HR")
                                .requestMatchers("/api/all-users-surveys/").hasAuthority("HR")
                                .requestMatchers("/api/users-surveys").hasAuthority("HR")
                                .requestMatchers("/api/statistics").hasAuthority("HR")
                                .requestMatchers("/api/set-archive").hasAuthority("HR")
                                .requestMatchers("/api/an-set-archive").hasAuthority("HR")
                                .anyRequest().permitAll())
                .sessionManagement(manager ->
                        manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // Разрешить все домены
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Разрешить все HTTP-методы
        configuration.setAllowedHeaders(List.of("*")); // Разрешить все заголовки
        configuration.setAllowCredentials(false); // Отключить передачу cookies
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
