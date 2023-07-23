package com.conryfinance.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MonthlyBudgetCreateDTO(
        @NotBlank(message = "Enter the description field")
        String description,
        @NotNull(message = "Enter the period field")
        @FutureOrPresent(message = "Enter this month's period or later")
        LocalDate period
) {}
