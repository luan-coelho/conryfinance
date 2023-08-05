package com.conryfinance.service;

import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.CardItem;
import com.conryfinance.repository.CardItemRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.QueryParam;

@ApplicationScoped
public class CardItemService extends BaseService<CardItem, CardItemRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentService;

    @Inject
    CardService cardService;

    @Transactional
    public CardItem create(@QueryParam("monthlybudget") Long monthlyBudgetId, String description) {
        CardItem defaultCardItemInstance = montlyBudgetComponentService.createCardItemInstance(description);
        Card card = cardService.findById(monthlyBudgetId);
        defaultCardItemInstance.setCard(card);
        this.repository.persist(defaultCardItemInstance);
        return defaultCardItemInstance;
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        CardItem cardItem = findById(id);
        cardItem.setCard(null);
        super.deleteById(id);
    }

    @Transactional
    public CardItem updateDescription(final Long cardItemId, final String newDescription) {
        CardItem cardItem = findById(cardItemId);
        cardItem.setDescription(newDescription);
        this.repository.persist(cardItem);
        return cardItem;
    }
}
