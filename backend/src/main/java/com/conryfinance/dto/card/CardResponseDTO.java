package com.conryfinance.dto.card;

import com.conryfinance.model.enums.CardType;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.CardItem;

import java.math.BigDecimal;
import java.util.List;

public record CardResponseDTO(String description, List<CardItem> cardItems, BigDecimal amount, CardType cardType) {

    public static CardResponseDTO toDataTransferObject(Card monthlyBudget) {
        return new CardResponseDTO(
                monthlyBudget.getDescription(),
                monthlyBudget.getCardItems(),
                monthlyBudget.getAmount(),
                monthlyBudget.getCardType()
        );
    }
}
