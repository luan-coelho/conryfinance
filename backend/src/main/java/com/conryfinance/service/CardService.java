package com.conryfinance.service;

import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.repository.CardRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CardService extends BaseService<Card, CardRepository> {
}
