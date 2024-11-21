package ru.bit.estimate.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
@EnableJpaRepositories(
        basePackages = "ru.bit.estimate.keycloak.repository",
        entityManagerFactoryRef = "keycloakEntityManagerFactory",
        transactionManagerRef = "keycloakTransactionManager"
)
public class KeycloakDataSourceConfig {


    @Value("${spring.datasource.keycloak.url}")
    private String url;

    @Value("${spring.datasource.keycloak.username}")
    private String username;

    @Value("${spring.datasource.keycloak.password}")
    private String password;

    @Value("${spring.datasource.keycloak.driver-class-name}")
    private String driverClassName;

    @Bean
    public DataSourceProperties keycloakDataSourceProperties() {
        DataSourceProperties properties = new DataSourceProperties();
        properties.setUrl(url);
        properties.setUsername(username);
        properties.setPassword(password);
        properties.setDriverClassName(driverClassName);
        return properties;
    }

    @Bean
    public DataSource keycloakDataSource() {
        return keycloakDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean(name = "keycloakEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean keycloakEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(keycloakDataSource())
                .packages("ru.bit.estimate.keycloak.model")
                .persistenceUnit("keycloak")
                .properties(hibernateProperties())
                .build();
    }

    @Bean
    public PlatformTransactionManager keycloakTransactionManager(
            EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(Objects.requireNonNull(keycloakEntityManagerFactory(builder).getObject()));
    }

    private Map<String, Object> hibernateProperties() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        return properties;
    }

}
