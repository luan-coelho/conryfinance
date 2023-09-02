package com.conryfinance.service;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.dto.montlybudget.MonthlyBudgetCreateDTO;
import com.conryfinance.dto.montlybudget.MonthlyBudgetResponseDTO;
import com.conryfinance.dto.montlybudget.MonthlyBudgetUpdateDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.repository.MonthlyBudgetRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.List;

@ApplicationScoped
public class MonthlyBudgetService extends BaseService<MonthlyBudget, MonthlyBudgetRepository> {

    @Inject
    MontlyBudgetComponentService montlyBudgetComponentsService;

    public PagedData<MonthlyBudgetResponseDTO> findAllWithPagination(Pageable pageable) {
        List<MonthlyBudgetResponseDTO> dtos = this.repository.getAllForPageable(pageable)
                .stream()
                .map(MonthlyBudgetResponseDTO::toDataTransferObject)
                .toList();
        return buildPagedData(dtos, pageable);
    }

    @Transactional
    public MonthlyBudget create(MonthlyBudgetCreateDTO monthlyBudget) {
        if (this.repository.existsByDescriptionEqualsIgnoreCase(monthlyBudget.description())) {
            throw new IllegalArgumentException("Já existe um orçamento mensal cadastrado com este nome");
        }
        MonthlyBudget monthlyBudgetPersisted = montlyBudgetComponentsService.createDefaultInstance(
                monthlyBudget.description(), monthlyBudget.period()
        );

        this.repository.persist(monthlyBudgetPersisted);

        return monthlyBudgetPersisted;
    }

    @Transactional
    public MonthlyBudget update(Long montlyBudgetId, MonthlyBudgetUpdateDTO monthlyBudget) {
        MonthlyBudget currentMonthlyBudget = this.findById(montlyBudgetId);

        if (this.repository.existsByDescriptionEqualsIgnoreCase(montlyBudgetId, monthlyBudget.description())) {
            throw new IllegalArgumentException("Já existe um orçamento mensal cadastrado com este nome");
        }

        currentMonthlyBudget.setDescription(monthlyBudget.description());
        currentMonthlyBudget.setPeriod(monthlyBudget.period());
        this.repository.persist(currentMonthlyBudget);

        return currentMonthlyBudget;
    }

    @Transactional
    public void updateDescription(Long montlyBudgetId, String newDescription) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.setDescription(newDescription);
        this.repository.persist(monthlyBudget);
    }

    @Transactional
    public void updateBudget(Long montlyBudgetId, BigDecimal newBudget) {
        MonthlyBudget monthlyBudget = findById(montlyBudgetId);
        monthlyBudget.setBudget(newBudget);
        this.repository.persist(monthlyBudget);
    }
}
