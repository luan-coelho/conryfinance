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

import java.util.List;

@ApplicationScoped
public class MonthlyBudgetService extends BaseService<MonthlyBudget, MonthlyBudgetRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentsService;

    public PagedData<MonthlyBudget> findAllPaginated(Pageable pageable) {
        return repository.findAllPaginated(pageable);
    }

    public List<MonthlyBudget> findAll() {
        return repository.findAll().list();
    }

    @Transactional
    public MonthlyBudget create(MonthlyBudgetCreateDTO monthlyBudget) {
        if (repository.existsByDescriptionEqualsIgnoreCase(monthlyBudget.description())) {
            throw new IllegalArgumentException("There is already an monthly budget registered with this name");
        }
        MonthlyBudget monthlyBudgetPersisted = montlyBudgetComponentsService.createDefaultInstance(
                monthlyBudget.description(), monthlyBudget.period()
        );
        repository.persist(monthlyBudgetPersisted);

        return monthlyBudgetPersisted;
    }

    @Transactional
    public void updateDescription(Long montlyBudgetId, String newDescription) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.setDescription(newDescription);
        repository.persist(monthlyBudget);
    }
}
