package com.conryfinance.dto.carditem;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CardItemCreateDTO(
        @NotBlank(message = "Informe uma descrição") String description,
        BigDecimal amount,
        LocalDateTime eventDateTime) {
}
