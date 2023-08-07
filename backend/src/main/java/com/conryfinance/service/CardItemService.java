package com.conryfinance.service;

import com.conryfinance.dto.carditem.CardItemCreateDTO;
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
    CardService cardService;

    @Transactional
    public CardItem create(@QueryParam("monthlybudget") Long monthlyBudgetId, CardItemCreateDTO cardItemCreateDTO) {
        CardItem cardItem = CardItem.dataTransferObjectToEntity(cardItemCreateDTO);
        Card card = cardService.findById(monthlyBudgetId);
        cardItem.setCard(card);
        this.repository.persist(cardItem);
        return cardItem;
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
