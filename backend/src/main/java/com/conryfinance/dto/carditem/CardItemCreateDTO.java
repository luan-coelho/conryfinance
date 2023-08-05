package com.conryfinance.dto.carditem;

import jakarta.validation.constraints.NotBlank;

public record CardItemCreateDTO(@NotBlank(message = "Informe uma descrição") String description) {
}
