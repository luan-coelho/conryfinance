package com.conryfinance.repository;

import com.conryfinance.model.monthlybudget.Card;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class CardRepository extends BaseRepository<Card> {

    public List<Card> listAllByMonthlyBudgetId(Long monthlyBudgetId) {
        return list("FROM CARD WHERE MONTHLYBUDGET_ID = ?1", monthlyBudgetId);
    }
}
