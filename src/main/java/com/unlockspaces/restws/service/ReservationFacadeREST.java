/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.itcs.jpautils.EasyCriteriaQuery;
import com.unlockspaces.persistence.entities.Reservation;
import com.unlockspaces.persistence.entities.ReservationStatus;
import com.unlockspaces.persistence.entities.Reservation_;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.persistence.entities.Venue_;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("reservations")
public class ReservationFacadeREST extends AbstractFacade<Reservation> {

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public ReservationFacadeREST() {
        super(Reservation.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Response createReservation(@Context HttpHeaders headers, Reservation entity) {
        System.out.println("create Reservation!!!");
        String userID = getLoggedUserId(headers);
        System.out.println("userID:" + userID);
        try {
            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);

            System.out.println("entity:" + entity);
            entity.setCreationDate((new Date()).toString());
            entity.setReservedBy(findUsuarioByUserId);
            entity.setReservationStatus(ReservationStatus.EnumReservationStatus.APROVED.getReservationStatus());
            
            super.create(entity);
            return getNoCacheResponseBuilder(Response.Status.OK).entity(entity).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Long id, Reservation entity) {
        System.out.println("edit Reservation!!!");
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        System.out.println("cancel Reservation!!!");
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Long id) {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(super.find(id)).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Path("findReservationsByUserId")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Reservation> findReservationsByUserId(@Context HttpHeaders headers) {
        System.out.println("findReservationsByUserId!!!");
        String userID = getLoggedUserId(headers);
        System.out.println("userID:" + userID);
        try {
            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);
            EasyCriteriaQuery<Reservation> query = new EasyCriteriaQuery<>(em, Reservation.class);
            query.addEqualPredicate(Reservation_.reservedBy.getName(), findUsuarioByUserId);
            return query.getAllResultList();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
        //return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Path("findReservationsByAdminId")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Reservation> findReservationsByAdminId(@Context HttpHeaders headers) {
        System.out.println("findReservationsByAdminId!!!");
        String userID = getLoggedUserId(headers);
        System.out.println("userID:" + userID);
        try {
            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);
            EasyCriteriaQuery<Venue> query = new EasyCriteriaQuery<>(em, Venue.class);
            query.addEqualPredicate(Venue_.createdBy.getName(), findUsuarioByUserId);
            List<Venue> venuesList = query.getAllResultList();
            LinkedList<Reservation> reservationsList = new LinkedList<>();
            for (Venue venue : venuesList) {
                for (Space space : venue.getSpaces()) {
                    EasyCriteriaQuery<Reservation> queryReservations = new EasyCriteriaQuery<>(em, Reservation.class);
                    queryReservations.addEqualPredicate(Reservation_.space.getName(),space);
                    reservationsList.addAll(queryReservations.getAllResultList());
                }
            }
            return reservationsList;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ArrayList<>();
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
