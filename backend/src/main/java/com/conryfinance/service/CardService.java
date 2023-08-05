package com.conryfinance.service;

import com.conryfinance.model.enums.CardType;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.repository.CardRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.QueryParam;

@ApplicationScoped
public class CardService extends BaseService<Card, CardRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentService;

    @Inject
    MonthlyBudgetService monthlyBudgetService;

    @Transactional
    public Card create(@QueryParam("monthlybudget") Long monthlyBudgetId) {
        Card defaultCardInstance = montlyBudgetComponentService.createDefaultCardInstance();
        MonthlyBudget monthlyBudget = monthlyBudgetService.findById(monthlyBudgetId);
        defaultCardInstance.setMonthlyBudget(monthlyBudget);
        this.repository.persist(defaultCardInstance);
        return defaultCardInstance;
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        Card card = findById(id);

        if (card.getCardType().equals(CardType.TOTAL_AMOUNT_SPENT) || card.getCardType().equals(CardType.TOTAL_AVAILABLE)) {
            throw new IllegalArgumentException("Card with this type cannot be deleted");
        }

        card.setMonthlyBudget(null);
        super.deleteById(id);
    }

    @Transactional
    public Card updateDescription(final Long cardId, final String newDescription) {
        Card card = findById(cardId);
        card.setDescription(newDescription);
        this.repository.persist(card);
        return card;
    }
}
