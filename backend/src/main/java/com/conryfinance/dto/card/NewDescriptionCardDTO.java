package com.conryfinance.dto.card;

import jakarta.validation.constraints.NotBlank;

public record NewDescriptionCardDTO(@NotBlank(message = "Enter a valid description") String newDescription) {
}
