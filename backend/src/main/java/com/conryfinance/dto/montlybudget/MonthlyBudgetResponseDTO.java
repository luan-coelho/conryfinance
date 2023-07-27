package com.conryfinance.dto.montlybudget;

import com.conryfinance.dto.card.CardResponseDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record MonthlyBudgetResponseDTO(Long id, String description, List<CardResponseDTO> cards, LocalDate period) {

    public static MonthlyBudgetResponseDTO toDataTransferObject(MonthlyBudget monthlyBudget) {
        return new MonthlyBudgetResponseDTO(
                monthlyBudget.getId(),
                monthlyBudget.getDescription(),
                monthlyBudget.getCards()
                        .stream()
                        .map(CardResponseDTO::toDataTransferObject)
                        .collect(Collectors.toList()),
                monthlyBudget.getPeriod()
        );
    }
}
