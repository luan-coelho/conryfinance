package com.conryfinance.repository;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.Pagination;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

public abstract class BaseRepository<T> implements PanacheRepositoryBase<T, Long> {

    public Pagination buildPagination(Pageable pageable) {
        long count = count();
        long totalPages = count / pageable.getSize();
        return new Pagination(pageable.getPage(), totalPages, count);
    }
}
