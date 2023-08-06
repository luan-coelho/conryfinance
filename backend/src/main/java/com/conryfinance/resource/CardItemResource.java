package com.conryfinance.resource;

import com.conryfinance.dto.card.NewDescriptionCardDTO;
import com.conryfinance.dto.carditem.CardItemCreateDTO;
import com.conryfinance.dto.carditem.CardItemResponseDTO;
import com.conryfinance.model.monthlybudget.CardItem;
import com.conryfinance.service.CardItemService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("/card-item")
public class CardItemResource {

    @Inject
    CardItemService cardItemService;

    @POST
    public Response create(@QueryParam("card") Long card, @Valid CardItemCreateDTO cardItemCreateDTO) {
        CardItem cardItem = cardItemService.create(card, cardItemCreateDTO.description());
        CardItemResponseDTO dto = CardItemResponseDTO.toDataTransferObject(cardItem);
        return Response.ok(dto).build();
    }

    @Path("/{id}")
    @DELETE
    public Response deleteById(@PathParam("id") Long id) {
        cardItemService.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/update-description/{id}")
    @POST
    public Response updateDescription(@PathParam("id") Long id, @Valid NewDescriptionCardDTO requestBody) {
        CardItem cardItem = cardItemService.updateDescription(id, requestBody.newDescription());
        CardItemResponseDTO dto = CardItemResponseDTO.toDataTransferObject(cardItem);
        return Response.ok(dto).build();
    }
}
