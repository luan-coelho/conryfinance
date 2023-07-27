package com.conryfinance.dto.montlybudget;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MonthlyBudgetCreateDTO(
        @NotBlank(message = "Enter the description field")
        String description,
        @NotNull(message = "Enter the period field")
        LocalDate period
) {}
