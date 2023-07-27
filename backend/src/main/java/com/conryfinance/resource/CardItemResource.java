package com.conryfinance.resource;

import com.conryfinance.service.CardItemService;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/card-item")
public class CardItemResource {

    @Inject
    CardItemService cardItemService;

    @Path("/{id}")
    @DELETE
    public Response deleteById(@PathParam("id") Long id) {
        cardItemService.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
