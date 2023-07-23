package com.conryfinance.handle.exceptionhandle;

import com.conryfinance.exception.ProblemDetails;

public interface ExceptionHandler {

    Class<? extends Exception> getExceptionType();

    String getTitle();

    int getStatus();

    default void handleException(Exception exception, ProblemDetails problemDetails) {
        problemDetails.setTitle(getTitle());
        problemDetails.setDetail(exception.getMessage());
        problemDetails.setStatus(getStatus());
    }
}
