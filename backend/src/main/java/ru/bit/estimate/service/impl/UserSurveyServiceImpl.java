package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.keycloak.model.UserEntity;
import ru.bit.estimate.keycloak.repository.KeycloakUserRepository;
import ru.bit.estimate.model.UserSurvey;
import ru.bit.estimate.repository.SurveyRepository;
import ru.bit.estimate.repository.UserSurveyRepository;
import ru.bit.estimate.service.UserSurveyService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSurveyServiceImpl implements UserSurveyService {
    @NonNull
    private final UserSurveyRepository repo;

    @NonNull
    private final KeycloakUserRepository userRepository;

    @NonNull
    private final SurveyRepository surveyRepository;

    @Override
    public List<UserSurvey> getAll() {
        return repo.findAll();
    }

    @Override
    public UserSurvey createUserSurvey(UserSurvey request) {
        // Проверяем существование опросника перед сохранением
        if (!surveyRepository.existsById(request.getSurveyId())) {
            throw new IllegalArgumentException("Survey with ID " + request.getSurveyId() + " does not exist.");
        }

        // Проверяем, есть ли такая связь уже в базе
        if (repo.existsByUserIdAndSurveyId(request.getUserId(), request.getSurveyId())) {
            throw new IllegalArgumentException("This survey is already assigned to the user.");
        }

        return repo.save(request);
    }

    @Override
    public void setAll(Long surveyId) {
        // Проверяем существование опросника
        if (!surveyRepository.existsById(surveyId)) {
            throw new IllegalArgumentException("Survey with ID " + surveyId + " does not exist.");
        }

        // Получаем всех пользователей из Keycloak
        List<UserEntity> userEntities = userRepository.findAll();

        // Преобразуем пользователей в объекты UserSurvey с переданным surveyId, исключая дублирование
        List<UserSurvey> userSurveys = userEntities.stream()
                .filter(user -> !repo.existsByUserIdAndSurveyId(user.getId(), surveyId))
                .map(user -> {
                    UserSurvey userSurvey = new UserSurvey();
                    userSurvey.setUserId(user.getId());
                    userSurvey.setSurveyId(surveyId);
                    return userSurvey;
                })
                .toList();

        // Сохраняем все записи в базу данных
        repo.saveAll(userSurveys);
    }

    @Override
    public List<UserSurvey> getUsersSurvey(String userId) {
        // Ищем все записи анкеты для конкретного пользователя
        return repo.findByUserId(userId);  // Этот метод должен быть определен в репозитории
    }



    @Override
    public void deleteUsersSurvey(String userId, Long surveyId) {
        // Удаляем анкету пользователя, если связь существует
        repo.deleteByUserIdAndSurveyId(userId, surveyId);
    }

    @Override
    public List<UserSurvey> getAllStudentBySurveyId(Long id) {
        return repo.findBySurveyId(id);
    }
}
