package com.conryfinance.resource;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.dto.MonthlyBudgetCreateDTO;
import com.conryfinance.dto.MonthlyBudgetResponseDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.service.MonthlyBudgetService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/montlybudget")
public class MonthlyBudgetResource {

    @Inject
    MonthlyBudgetService monthlyBudgetService;

    @GET
    public Response findAll(Pageable pageable) {
        PagedData<MonthlyBudget> response = monthlyBudgetService.findAll(pageable);
        return Response.ok(response).build();
    }

    @Path("/{id}")
    @GET
    public Response findById(@PathParam("id") Long montlyBudgetId) {
        MonthlyBudget monthlyBudget = monthlyBudgetService.findById(montlyBudgetId);
        MonthlyBudgetResponseDTO dto = MonthlyBudgetResponseDTO.toDataTransferObject(monthlyBudget);
        return Response.status(Response.Status.CREATED).entity(dto).build();
    }

    @POST
    public Response create(@Valid MonthlyBudgetCreateDTO monthlyBudgetCreateDTO) {
        MonthlyBudget monthlyBudgetCreated = monthlyBudgetService.create(monthlyBudgetCreateDTO);
        MonthlyBudgetResponseDTO dto = MonthlyBudgetResponseDTO.toDataTransferObject(monthlyBudgetCreated);
        return Response.status(Response.Status.CREATED).entity(dto).build();
    }

    @Path("/updateDescription/{id}")
    @POST
    public Response updateDescription(@PathParam("id") Long montlyBudgetId, String newDescription) {
        monthlyBudgetService.updateDescription(montlyBudgetId, newDescription);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
