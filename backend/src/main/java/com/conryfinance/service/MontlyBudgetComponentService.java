package com.conryfinance.service;

import com.conryfinance.model.enums.CardType;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.CardItem;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import jakarta.enterprise.context.ApplicationScoped;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Class responsible for creating components of a monthly budget
 */
@ApplicationScoped
public class MontlyBudgetComponentService {

    static final String INITIAL_DESCRIPTION = "Description";
    static final BigDecimal INITIAL_AMOUNT = new BigDecimal("0.00");

    /**
     * Create a default monthly budget instance
     *
     * @param description Montly budget description
     * @param period      Monthly budget period
     * @return Standard monthly budget instance
     */
    public MonthlyBudget createDefaultInstance(String description, LocalDate period) {

        Card defaultCard = Card
                .builder()
                .description(INITIAL_DESCRIPTION)
                .amount(INITIAL_AMOUNT)
                .cardType(CardType.DEFAULT)
                .cardItems(new ArrayList<>(
                        List.of(buildCardItem(INITIAL_DESCRIPTION))
                )).build();

        Card totalAmountCard = Card
                .builder()
                .description("Total amount")
                .amount(INITIAL_AMOUNT)
                .cardType(CardType.TOTAL_AMOUNT_SPENT)
                .cardItems(new ArrayList<>(
                        List.of(buildCardItem(INITIAL_DESCRIPTION))
                )).build();

        Card totalAvailable = Card
                .builder()
                .description("Total available")
                .amount(INITIAL_AMOUNT)
                .cardType(CardType.TOTAL_AVAILABLE)
                .cardItems(new ArrayList<>(
                        List.of(buildCardItem(INITIAL_DESCRIPTION))
                )).build();

        ArrayList<Card> cards = new ArrayList<>(Arrays.asList(defaultCard, totalAmountCard, totalAvailable));

        return MonthlyBudget
                .builder()
                .description(description)
                .period(period)
                .cards(cards)
                .build();
    }

    /**
     * Constructs a card item with a standard card item inserted
     *
     * @param description Card description
     * @return Default card
     */
    public Card buildCard(String description) {
        Card newCard = new Card();
        newCard.setDescription(description);
        newCard.getCardItems().add(buildCardItem(INITIAL_DESCRIPTION));
        return newCard;
    }

    /**
     * Constructs a card item with a standard card item inserted
     *
     * @return Default card item
     */
    public CardItem buildCardItem(String description) {
        return new CardItem(null, description, INITIAL_AMOUNT, LocalDateTime.now());
    }
}
