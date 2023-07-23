package com.conryfinance.handle.exceptionhandle;

import org.jboss.resteasy.reactive.RestResponse;

public class IllegalArgumentExceptionHandler implements ExceptionHandler {

    @Override
    public Class<? extends Exception> getExceptionType() {
        return IllegalArgumentException.class;
    }

    @Override
    public String getTitle() {
        return "Validation Error";
    }

    @Override
    public int getStatus() {
        return RestResponse.StatusCode.BAD_REQUEST;
    }
}
