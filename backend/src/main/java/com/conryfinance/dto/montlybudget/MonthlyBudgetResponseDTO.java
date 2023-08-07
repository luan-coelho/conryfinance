package com.conryfinance.dto.montlybudget;

import com.conryfinance.dto.card.CardResponseDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import jakarta.persistence.Transient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record MonthlyBudgetResponseDTO(Long id,
                                       String description,
                                       List<CardResponseDTO> cards,
                                       LocalDate period,
                                       BigDecimal budget,
                                       BigDecimal remainingTotalAmount,
                                       BigDecimal totalAmountSpent
) {

    public static MonthlyBudgetResponseDTO toDataTransferObject(MonthlyBudget monthlyBudget) {
        return new MonthlyBudgetResponseDTO(
                monthlyBudget.getId(),
                monthlyBudget.getDescription(),
                monthlyBudget.getCards()
                        .stream()
                        .map(CardResponseDTO::toDataTransferObject)
                        .collect(Collectors.toList()),
                monthlyBudget.getPeriod(),
                monthlyBudget.getBudget(),
                monthlyBudget.calculateRemainingTotalAmount(),
                monthlyBudget.calculateTotalAmountSpent()
        );
    }
}
