package ru.bit.estimate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private UUID id;
    private String email;
    private String password; // Рекомендуется исключить пароль из DTO для безопасности
    private UUID roles; // Аналогично, если roles является сложным объектом, возможно, стоит изменить тип
}
