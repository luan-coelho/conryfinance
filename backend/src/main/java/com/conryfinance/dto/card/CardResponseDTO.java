package com.conryfinance.dto.card;

import com.conryfinance.dto.carditem.CardItemResponseDTO;
import com.conryfinance.model.enums.CardType;
import com.conryfinance.model.monthlybudget.Card;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public record CardResponseDTO(Long id, String description, List<CardItemResponseDTO> cardItems, BigDecimal amount,
                              CardType cardType) {

    public static CardResponseDTO toDataTransferObject(Card monthlyBudget) {
        return new CardResponseDTO(
                monthlyBudget.getId(),
                monthlyBudget.getDescription(),
                monthlyBudget.getCardItems()
                        .stream()
                        .map(CardItemResponseDTO::toDataTransferObject)
                        .collect(Collectors.toList()),
                monthlyBudget.getAmount(),
                monthlyBudget.getCardType()
        );
    }
}
