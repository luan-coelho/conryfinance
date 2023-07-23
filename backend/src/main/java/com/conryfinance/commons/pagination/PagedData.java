package com.conryfinance.commons.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class PagedData<T> {

    private List<T> data;
    private Pagination pagination = new Pagination();
}

