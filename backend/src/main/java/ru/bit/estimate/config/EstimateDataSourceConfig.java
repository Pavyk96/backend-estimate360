package ru.bit.estimate.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
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
        basePackages = "ru.bit.estimate.repository",
        entityManagerFactoryRef = "estimateEntityManagerFactory",
        transactionManagerRef = "estimateTransactionManager"
)
public class EstimateDataSourceConfig {

    @Value("${spring.datasource.estimate.url}")
    private String url;

    @Value("${spring.datasource.estimate.username}")
    private String username;

    @Value("${spring.datasource.estimate.password}")
    private String password;

    @Value("${spring.datasource.estimate.driver-class-name}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSourceProperties estimateDataSourceProperties() {
        DataSourceProperties properties = new DataSourceProperties();
        properties.setUrl(url);
        properties.setUsername(username);
        properties.setPassword(password);
        properties.setDriverClassName(driverClassName);
        return properties;
    }

    @Bean
    @Primary
    public DataSource estimateDataSource() {
        return estimateDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean(name = "estimateEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean estimateEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(estimateDataSource())
                .packages("ru.bit.estimate.model")
                .persistenceUnit("estimate")
                .properties(hibernateProperties())
                .build();
    }

    @Bean
    @Primary
    public PlatformTransactionManager estimateTransactionManager(
            EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(Objects.requireNonNull(estimateEntityManagerFactory(builder).getObject()));
    }

    private Map<String, Object> hibernateProperties() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.show_sql", true);
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        return properties;
    }

}
