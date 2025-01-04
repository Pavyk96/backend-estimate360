package ru.bit.estimate.service.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.bit.estimate.dto.FullUserDTO;
import ru.bit.estimate.dto.StatisticsDTO;
import ru.bit.estimate.keycloak.repository.KeycloakUserRepository;
import ru.bit.estimate.model.SurveyAnswer;
import ru.bit.estimate.service.QuestionService;
import ru.bit.estimate.service.StatisticsService;
import ru.bit.estimate.service.SurveyAnswerTableService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    @NonNull
    private final KeycloakUserRepository keycloakUserRepository;

    @NonNull
    private final SurveyAnswerTableService surveyAnswerTableService;

    @NonNull
    private final QuestionService questionService;

    @NonNull
    private final FullUserServiceImpl fullUserService;
    @Override
    public List<StatisticsDTO> getStatisticsByUserId(UUID userId) {
        FullUserDTO user = fullUserService.getFullById(String.valueOf(userId));
        List<SurveyAnswer> surveyAnswers = surveyAnswerTableService.findByTargetId(userId);
        Map<Long, List<SurveyAnswer>> answersBySurvey = surveyAnswers.stream()
                .collect(Collectors.groupingBy(SurveyAnswer::getSurveyId));
        return answersBySurvey.entrySet().stream()
                .map(entry -> {
                    Long surveyId = entry.getKey();
                    List<SurveyAnswer> answers = entry.getValue();

                    Map<String, List<SurveyAnswer>> answersByQuestionType = answers.stream()
                            .collect(Collectors.groupingBy(
                                    answer -> questionService.getQuestionByID(answer.getQuestionId()).getType()
                            ));

                    List<StatisticsDTO.QuestionStatistics> questionStatisticsList = answersByQuestionType.entrySet().stream()
                            .map(qEntry -> {
                                String questionType = qEntry.getKey();
                                List<SurveyAnswer> questionAnswers = qEntry.getValue();

                                StatisticsDTO.ScoreStatistics scoreStatistics = calculateAverageScores(questionAnswers, user);

                                return StatisticsDTO.QuestionStatistics.builder()
                                        .questionType(questionType)
                                        .data(List.of(scoreStatistics))
                                        .build();
                            })
                            .toList();

                    return StatisticsDTO.builder()
                            .surveyId(String.valueOf(surveyId))
                            .data(questionStatisticsList)
                            .build();
                })
                .toList();
    }

    private StatisticsDTO.ScoreStatistics calculateAverageScores(List<SurveyAnswer> answers, FullUserDTO user) {
        List<Double> bossScores = new ArrayList<>();
        List<Double> subordinateScores = new ArrayList<>();
        List<Double> otherScores = new ArrayList<>();
        List<Double> userHimselfScores = new ArrayList<>();

        for (SurveyAnswer answer : answers) {
            double score = Double.parseDouble(answer.getAnswer());

            // Пропускаем, если ответ равен 0
            if (score == 0) {
                continue;
            }

            // Проверяем, нужно ли реверсировать оценку
            boolean isReversed = questionService.getQuestionByID(answer.getQuestionId()).isAnswerScoreIsReversed();
            if (isReversed) {
                score = reverseScore(score);
            }

            // Определяем роль ответившего пользователя
            String answeredUserId = String.valueOf(answer.getUserId());
            Role role = determineRole(user, answeredUserId);

            // Распределяем оценки по ролям
            switch (role) {
                case SUBORDINATE -> subordinateScores.add(score);
                case BOSS -> bossScores.add(score);
                case USER_HIMSELF -> userHimselfScores.add(score);
                case OTHER -> otherScores.add(score);
                default -> throw new IllegalArgumentException("Неизвестная роль: " + role);
            }
        }

        // Рассчитываем средние значения для каждой роли
        return StatisticsDTO.ScoreStatistics.builder()
                .bossesAvgScore(calculateAverage(bossScores))
                .subordinatesAvgScore(calculateAverage(subordinateScores))
                .othersAvgScore(calculateAverage(otherScores))
                .userHimselfAvgScore(calculateAverage(userHimselfScores))
                .build();
    }


    private Role determineRole(FullUserDTO user, String answeredUserId) {
        if (user.getSubordinates().stream().anyMatch(reducedUser -> reducedUser.getId().equals(answeredUserId))) {
            return Role.SUBORDINATE;
        } else if (user.getChiefs().stream().anyMatch(reducedUser -> reducedUser.getId().equals(answeredUserId))) {
            return Role.BOSS;
        } else if (user.getUser().getId().equals(answeredUserId)) {
            return Role.USER_HIMSELF;
        } else {
            return Role.OTHER;
        }
    }

    private enum Role {
        BOSS,
        SUBORDINATE,
        USER_HIMSELF,
        OTHER
    }

    private double calculateAverage(List<Double> scores) {
        if (scores == null || scores.isEmpty()) {
            return 0.0;
        }
        return scores.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    private double reverseScore(double score) {
        // Преобразуем оценку: 5 → 1, 4 → 2, 3 → 3, 2 → 4, 1 → 5
        return switch ((int) score) {
            case 5 -> 1;
            case 4 -> 2;
            case 3 -> 3;
            case 2 -> 4;
            case 1 -> 5;
            default -> throw new IllegalArgumentException("Некорректное значение для реверса: " + score);
        };
    }


}
