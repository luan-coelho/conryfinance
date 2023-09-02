package com.conryfinance.repository;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.commons.pagination.Pagination;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.*;

@ApplicationScoped
public class MonthlyBudgetRepository extends BaseRepository<MonthlyBudget> {

    Optional<MonthlyBudget> findByDescriptionEqualsIgnoreCase(String description) {
        return find("FROM MonthlyBudget WHERE description ILIKE ?1", description).singleResultOptional();
    }

    public boolean existsByDescriptionEqualsIgnoreCase(Long id, String description) {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        params.put("description", description);
        return count("FROM MonthlyBudget WHERE description LIKE ?1 AND id != ?2", params) > 0;
    }

    public boolean existsByDescriptionEqualsIgnoreCase(String description) {
        Map<String, Object> params = new HashMap<>();
        params.put("description", description);
        return count("FROM MonthlyBudget WHERE description LIKE ?1", params) > 0;
    }

    public PagedData<MonthlyBudget> getAllWithPagination(Pageable pageable) {
        List<MonthlyBudget> paginatedBudgets = getAllForPageable(pageable);
        Pagination paginationMetaData = buildPagination(pageable);
        return new PagedData<>(paginatedBudgets, paginationMetaData);
    }

    public List<MonthlyBudget> getAllForPageable(Pageable pageable) {
        return findAll().page(Page.of(pageable.getPage(), pageable.getSize())).list();
    }
}
