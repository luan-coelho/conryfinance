package com.conryfinance.service;

import com.conryfinance.model.enums.CardType;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.CardItem;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Class responsible for creating components of a monthly budget
 */
@Singleton
public class MontlyBudgetComponentService {

    static final String INITIAL_DESCRIPTION = "Descrição";
    static final BigDecimal INITIAL_AMOUNT = new BigDecimal("0.00");

    /**
     * Create a default monthly budget instance
     *
     * @param description Montly budget newDescription
     * @param period      Monthly budget period
     * @return Standard monthly budget instance
     */
    public MonthlyBudget createDefaultInstance(String description, LocalDate period) {
        MonthlyBudget monthlyBudget = MonthlyBudget
                .builder()
                .description(description)
                .period(period)
                .budget(new BigDecimal(BigInteger.ZERO))
                .remainingTotalAmount(new BigDecimal(BigInteger.ZERO))
                .totalAmountSpent(new BigDecimal(BigInteger.ZERO))
                .build();

        Card defaultCard = Card
                .builder()
                .description(INITIAL_DESCRIPTION)
                .amount(INITIAL_AMOUNT)
                .cardType(CardType.DEFAULT)
                .monthlyBudget(monthlyBudget)
                .cardItems(new ArrayList<>(
                        List.of(buildCardItem(INITIAL_DESCRIPTION))
                )).build();

        monthlyBudget.setCards(new ArrayList<>(Collections.singletonList(defaultCard)));
        return monthlyBudget;
    }

    public Card createDefaultCardInstance() {
        return buildCard(INITIAL_DESCRIPTION);
    }

    public CardItem createCardItemInstance(String description) {
        return buildCardItem(description);
    }

    /**
     * Constructs a card item with a standard card item inserted
     *
     * @param description Card newDescription
     * @return Default card
     */
    private Card buildCard(String description) {
        Card newCard = new Card();
        newCard.setDescription(description);
        return newCard;
    }

    /**
     * Constructs a card item with a standard card item inserted
     *
     * @return Default card item
     */
    public CardItem buildCardItem(String description) {
        return new CardItem(null, description, INITIAL_AMOUNT, LocalDateTime.now(), null);
    }
}
