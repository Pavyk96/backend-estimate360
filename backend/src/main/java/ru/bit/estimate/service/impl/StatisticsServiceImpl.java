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
                                        .question_type(questionType)
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
            String answeredUserId = String.valueOf(answer.getUserId());
            double score = Double.parseDouble(answer.getAnswer());
            boolean isReversed = questionService.getQuestionByID(answer.getQuestionId()).isAnswerScoreIsReversed();
            if (isReversed) {
                score = reverseScore(score);
            }
            Role role = determineRole(user, answeredUserId);

            switch (role) {
                case SUBORDINATE -> subordinateScores.add(score);
                case BOSS -> bossScores.add(score);
                case USER_HIMSELF -> userHimselfScores.add(score);
                case OTHER -> otherScores.add(score);
            }

        }

        return StatisticsDTO.ScoreStatistics.builder()
                .bosses_avg_score(calculateAverage(bossScores))
                .subordinates_avg_score(calculateAverage(subordinateScores))
                .others_avg_score(calculateAverage(otherScores))
                .user_himself_avg_score(calculateAverage(userHimselfScores))
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
        // Преобразуем оценку: 0 -> 5, 1 -> 4, ..., 5 -> 0
        return 5.0 - score;
    }

}
