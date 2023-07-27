package com.conryfinance.dto.carditem;

import com.conryfinance.model.monthlybudget.CardItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CardItemResponseDTO(Long id, String description, BigDecimal amount, LocalDateTime eventDateTime) {

    public static CardItemResponseDTO toDataTransferObject(CardItem cardItem) {
        return new CardItemResponseDTO(
                cardItem.getId(),
                cardItem.getDescription(),
                cardItem.getAmount(),
                cardItem.getEventDateTime()
        );
    }
}