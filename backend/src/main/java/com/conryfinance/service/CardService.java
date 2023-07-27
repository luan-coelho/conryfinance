package com.conryfinance.service;

import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.repository.CardRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CardService extends BaseService<Card, CardRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentService;

    @Inject
    MonthlyBudgetService monthlyBudgetService;

    @Transactional
    public Card create(Long montlyBudgetId) {
        Card defaultCardInstance = montlyBudgetComponentService.createDefaultCardInstance();
        MonthlyBudget monthlyBudget = monthlyBudgetService.findById(montlyBudgetId);
        defaultCardInstance.setMonthlyBudget(monthlyBudget);
        repository.persist(defaultCardInstance);
        return defaultCardInstance;
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        Card card = findById(id);
        card.setMonthlyBudget(null);
        repository.persistAndFlush(card);
        super.deleteById(id);
    }

    @Transactional
    public Card updateDescription(Long cardId, String newDescription) {
        Card card = findById(cardId);
        card.setDescription(newDescription);
        repository.persist(card);
        return card;
    }
}
