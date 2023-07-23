package com.conryfinance.handle.exceptionhandle;

import jakarta.ws.rs.NotFoundException;
import org.jboss.resteasy.reactive.RestResponse;

public class NotFoundExceptionHandler implements ExceptionHandler {

    @Override
    public Class<? extends Exception> getExceptionType() {
        return NotFoundException.class;
    }

    @Override
    public String getTitle() {
        return "Not Found";
    }

    @Override
    public int getStatus() {
        return RestResponse.StatusCode.NOT_FOUND;
    }
}
