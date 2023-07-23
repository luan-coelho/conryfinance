package com.conryfinance.commons.pagination;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
{
    "data": [

    ],
    "pagination": {
        "currentPage": 1,
        "perPage": 20,
        "totalPages": 5,
        "totalItems": 100
    }
}
*/
@Setter
@Getter
@NoArgsConstructor
public class Pagination {

    static final int STANDARD_PAGINATION_SIZE = 25;

    private int currentPage;
    private int itemsPerPage = STANDARD_PAGINATION_SIZE;
    private long totalPages;
    private long totalItems;

    public Pagination(int currentPage, long totalPages, long totalItems) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
    }
}
