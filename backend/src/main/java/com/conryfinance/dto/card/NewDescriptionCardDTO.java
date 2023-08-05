package com.conryfinance.dto.card;

import jakarta.validation.constraints.NotBlank;

public record NewDescriptionCardDTO(@NotBlank(message = "Informe uma descrição") String newDescription) {
}
