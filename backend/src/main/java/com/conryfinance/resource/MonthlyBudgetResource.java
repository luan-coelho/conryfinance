package com.conryfinance.resource;

import com.conryfinance.commons.pagination.Pageable;
import com.conryfinance.commons.pagination.PagedData;
import com.conryfinance.dto.montlybudget.MonthlyBudgetCreateDTO;
import com.conryfinance.dto.montlybudget.MonthlyBudgetResponseDTO;
import com.conryfinance.dto.montlybudget.MonthlyBudgetUpdateBudgetDTO;
import com.conryfinance.dto.montlybudget.MonthlyBudgetUpdateDTO;
import com.conryfinance.model.monthlybudget.MonthlyBudget;
import com.conryfinance.service.MonthlyBudgetService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.math.BigDecimal;

@Path("/monthlybudget")
public class MonthlyBudgetResource {

    @Inject
    MonthlyBudgetService monthlyBudgetService;

    @GET
    public Response findAll(@BeanParam Pageable pageable) {
        PagedData<MonthlyBudgetResponseDTO> response = monthlyBudgetService.findAllWithPagination(pageable);
        return Response.ok(response).build();
    }

    @Path("/{id}")
    @GET
    public Response findById(@PathParam("id") Long montlyBudgetId) {
        MonthlyBudget monthlyBudget = monthlyBudgetService.findById(montlyBudgetId);
        MonthlyBudgetResponseDTO dto = MonthlyBudgetResponseDTO.toDataTransferObject(monthlyBudget);
        return Response.ok().entity(dto).build();
    }

    @POST
    public Response create(@Valid MonthlyBudgetCreateDTO monthlyBudgetCreateDTO) {
        MonthlyBudget monthlyBudgetCreated = monthlyBudgetService.create(monthlyBudgetCreateDTO);
        MonthlyBudgetResponseDTO dto = MonthlyBudgetResponseDTO.toDataTransferObject(monthlyBudgetCreated);
        return Response.status(Response.Status.CREATED).entity(dto).build();
    }

    @Path("/{id}")
    @PATCH
    public Response update(@PathParam("id") Long montlyBudgetId, @Valid MonthlyBudgetUpdateDTO monthlyBudgetCreateDTO) {
        MonthlyBudget monthlyBudgetCreated = monthlyBudgetService.update(montlyBudgetId, monthlyBudgetCreateDTO);
        MonthlyBudgetResponseDTO dto = MonthlyBudgetResponseDTO.toDataTransferObject(monthlyBudgetCreated);
        return Response.status(Response.Status.CREATED).entity(dto).build();
    }

    @Path("/update-description/{id}")
    @PATCH
    public Response updateDescription(@PathParam("id") Long montlyBudgetId, String newDescription) {
        monthlyBudgetService.updateDescription(montlyBudgetId, newDescription);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/update-budget/{id}")
    @PUT
    public Response updateBudget(@PathParam("id") Long montlyBudgetId, MonthlyBudgetUpdateBudgetDTO dto) {
        BigDecimal budget = new BigDecimal(dto.newBudget());
        monthlyBudgetService.updateBudget(montlyBudgetId, budget);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @Path("/{id}")
    @DELETE
    public Response deletebyId(@PathParam("id") Long id) {
        monthlyBudgetService.deleteById(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
