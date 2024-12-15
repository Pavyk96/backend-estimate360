package ru.bit.estimate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
        @JsonProperty("question_type")
        private String questionType;
        private List<ScoreStatistics> data;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreStatistics {

        @JsonProperty("bosses_avg_score")
        private double bossesAvgScore;
        @JsonProperty("subordinates_avg_score")
        private double subordinatesAvgScore;
        @JsonProperty("others_avg_score")
        private double othersAvgScore;
        @JsonProperty("user_himself_avg_score")
        private double userHimselfAvgScore;
    }

}
