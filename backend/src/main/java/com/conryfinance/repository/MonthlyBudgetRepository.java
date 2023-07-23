package com.conryfinance.repository;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.commons.pagination.Pagination;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MonthlyBudgetRepository extends BaseRepository<MonthlyBudget> {

    Optional<MonthlyBudget> findByDescriptionEqualsIgnoreCase(String description) {
        return find("description ILIKE ?1", description).singleResultOptional();
    }

    public boolean existsByDescriptionEqualsIgnoreCase(String description) {
        return count("description LIKE ?1", description) > 0;
    }

    public PagedData<MonthlyBudget> listAllPaginated(Pageable pageable) {
        PanacheQuery<MonthlyBudget> list = findAll();
        List<MonthlyBudget> monthlyBudgets = list.page(Page.of(pageable.getPage(), pageable.getSize())).list();
        Pagination pagination = buildPagination(pageable);
        return new PagedData<>(monthlyBudgets, pagination);
    }
}
