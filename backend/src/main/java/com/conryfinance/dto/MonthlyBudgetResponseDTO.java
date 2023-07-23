package com.conryfinance.dto;

import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.MonthlyBudget;

import java.time.LocalDate;
import java.util.List;

public record MonthlyBudgetResponseDTO(Long id, String description, List<Card> cards, LocalDate period) {

    public static MonthlyBudgetResponseDTO toDataTransferObject(MonthlyBudget monthlyBudget) {
        return new MonthlyBudgetResponseDTO(
                monthlyBudget.getId(),
                monthlyBudget.getDescription(),
                monthlyBudget.getCards(),
                monthlyBudget.getPeriod()
        );
    }
}
