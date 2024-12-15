package ru.bit.estimate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {

    @JsonProperty("survey_id")
    private String surveyId;

    private List<QuestionStatistics> data;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionStatistics {
        private String question_type;
        private List<ScoreStatistics> data;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreStatistics {
        private double bosses_avg_score;
        private double subordinates_avg_score;
        private double others_avg_score;
        private double user_himself_avg_score;
    }
}
