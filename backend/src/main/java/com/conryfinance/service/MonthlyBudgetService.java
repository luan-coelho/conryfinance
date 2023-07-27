package com.conryfinance.service;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.dto.montlybudget.MonthlyBudgetCreateDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.repository.MonthlyBudgetRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class MonthlyBudgetService extends BaseService<MonthlyBudget, MonthlyBudgetRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentsService;

    @Inject
    CardService cardService;

    public PagedData<MonthlyBudget> findAllWithPagination(Pageable pageable) {
        return this.repository.getAllWithPagination(pageable);
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
    public MonthlyBudget addCard(Long montlyBudgetId) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
//        List<Card> cards = cardRepository.listAllByMonthlyBudgetId(montlyBudgetId);
        monthlyBudget.getCards().add(montlyBudgetComponentsService.createDefaultCardInstance());
        this.repository.persist(monthlyBudget);
        return monthlyBudget;
    }

    @Transactional
    public void updateDescription(Long montlyBudgetId, String newDescription) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.setDescription(newDescription);
        this.repository.persist(monthlyBudget);
    }
}
