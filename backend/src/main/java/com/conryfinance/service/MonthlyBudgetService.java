package com.conryfinance.service;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.dto.MonthlyBudgetCreateDTO;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.repository.MonthlyBudgetRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class MonthlyBudgetService extends BaseService<MonthlyBudget, MonthlyBudgetRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentsService;

    public PagedData<MonthlyBudget> findAll(Pageable pageable) {
        return this.repository.listAllPaginated(pageable);
    }

    @Transactional
    public MonthlyBudget create(MonthlyBudgetCreateDTO monthlyBudget) {
        if (this.repository.existsByDescriptionEqualsIgnoreCase(monthlyBudget.description())) {
            throw new IllegalArgumentException("There is already an monthly budget registered with this name");
        }
        MonthlyBudget monthlyBudgetPersisted = montlyBudgetComponentsService.createDefaultInstance(
                monthlyBudget.description(), monthlyBudget.period()
        );

        this.repository.persist(monthlyBudgetPersisted);

        return monthlyBudgetPersisted;
    }

    @Transactional
    public void addCard(Long montlyBudgetId, Card card) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.getCards().add(card);
        this.repository.persist(monthlyBudget);
    }

    @Transactional
    public void updateDescription(Long montlyBudgetId, String newDescription) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.setDescription(newDescription);
        this.repository.persist(monthlyBudget);
    }
}
