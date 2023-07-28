package com.conryfinance.service;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.commons.pagination.Pagination;
import com.conryfinance.repository.BaseRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

public abstract class BaseService<T, R extends BaseRepository<T>> {

    @Inject
    public R repository;

    public List<T> findAll() {
        return repository.listAll();
    }

    public T findById(Long id) {
        return repository.findByIdOptional(id).orElseThrow(() -> new NotFoundException("Resource not found by id"));
    }

    @Transactional
    public T create(T entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public T update(T entity) {
        return repository.getEntityManager().merge(entity);
    }

    @Transactional
    public void deleteById(Long id) {
        findById(id);
        repository.deleteById(id);
    }

    protected PagedData buildPagedData(List data, Pageable pageable) {
        Pagination paginationMetaData = repository.buildPagination(pageable);
        return new PagedData(data, paginationMetaData);
    }
}

