package com.conryfinance.handle;

import com.conryfinance.exception.ProblemDetails;
import com.conryfinance.handle.exceptionhandle.ExceptionHandler;
import io.vertx.core.http.HttpServerRequest;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.SneakyThrows;

import java.net.URI;

@Provider
public class GlobalHandleException implements ExceptionMapper<Exception> {

    @Context
    HttpServerRequest request;

    @Override
    public Response toResponse(Exception exception) {
        ProblemDetails problemDetails = buildResponse(exception);
        return Response.status(problemDetails.getStatus()).entity(problemDetails).build();
    }

    @SneakyThrows
    private ProblemDetails buildResponse(Exception exception) {
        ProblemDetails problemDetails = ProblemDetails.builder()
                .type(new URI(""))
                .instance(new URI(request.absoluteURI()))
                .build();

        ExceptionHandler handler = ExceptionHandlerRegistry.getHandler(exception.getClass());
        handler.handleException(exception, problemDetails);

        return problemDetails;
    }
}

