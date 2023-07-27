package com.conryfinance.service;

import com.conryfinance.model.monthlybudget.CardItem;
import com.conryfinance.repository.CardItemRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CardItemService extends BaseService<CardItem, CardItemRepository> {

    @Override
    public void deleteById(Long id) {
        findById(id);
        super.deleteById(id);
    }
}
