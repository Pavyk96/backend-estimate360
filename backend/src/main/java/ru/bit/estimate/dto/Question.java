package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Question {
    private long id;
    private String question;
    private String type;
}
