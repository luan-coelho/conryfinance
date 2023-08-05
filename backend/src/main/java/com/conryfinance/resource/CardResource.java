package com.conryfinance.resource;

import com.conryfinance.dto.card.CardResponseDTO;
import com.conryfinance.dto.card.NewDescriptionCardDTO;
import com.conryfinance.model.monthlybudget.Card;
import com.conryfinance.service.CardService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/card")
public class CardResource {

    @Inject
    CardService cardService;

    @POST
    public Response create(@QueryParam("monthlybudget") Long monthlyBudgetId) {
        Card card = cardService.create(monthlyBudgetId);
        CardResponseDTO dto = CardResponseDTO.toDataTransferObject(card);
        return Response.ok(dto).build();
    }

    @Path("/{id}")
    @DELETE
    public Response deleteById(@PathParam("id") Long id) {
        cardService.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}")
    @POST
    public Response updateDescription(@PathParam("id") Long id, NewDescriptionCardDTO requestBody) {
        Card card = cardService.updateDescription(id, requestBody.newDescription());
        CardResponseDTO dto = CardResponseDTO.toDataTransferObject(card);
        return Response.ok(dto).build();
    }
}
