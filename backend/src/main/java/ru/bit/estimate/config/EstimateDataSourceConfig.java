package ru.bit.estimate.config;

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
        basePackages = "ru.bit.estimate.repositories", // Пакет с репозиториями для основной базы данных
        entityManagerFactoryRef = "estimateEntityManagerFactory",
        transactionManagerRef = "estimateTransactionManager"
)
public class EstimateDataSourceConfig {

    @Bean
    @Primary
    public DataSourceProperties estimateDataSourceProperties() {
        // Установите свойства для основной базы данных
        DataSourceProperties properties = new DataSourceProperties();
        properties.setUrl("jdbc:postgresql://postgres:5432/estimate_db"); // URL для подключения
        properties.setUsername("postgres");
        properties.setPassword("postgres");
        properties.setDriverClassName("org.postgresql.Driver");
        return properties;
    }

    @Bean
    @Primary
    public DataSource estimateDataSource() {
        // Создание DataSource для основной базы данных
        return estimateDataSourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean(name = "estimateEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean estimateEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {
        // Конфигурация EntityManagerFactory для основной базы данных
        return builder
                .dataSource(estimateDataSource())
                .packages("ru.bit.estimate.model") // Пакет с сущностями (моделями)
                .persistenceUnit("estimate")
                .properties(hibernateProperties())
                .build();
    }

    @Bean
    @Primary
    public PlatformTransactionManager estimateTransactionManager(
            EntityManagerFactoryBuilder builder) {
        // Конфигурация TransactionManager для основной базы данных
        return new JpaTransactionManager(Objects.requireNonNull(estimateEntityManagerFactory(builder).getObject()));
    }

    private Map<String, Object> hibernateProperties() {
        // Дополнительные свойства Hibernate
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update"); // Управление схемой БД
        properties.put("hibernate.show_sql", true); // Показ SQL-запросов
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect"); // Диалект для PostgreSQL
        return properties;
    }

}
