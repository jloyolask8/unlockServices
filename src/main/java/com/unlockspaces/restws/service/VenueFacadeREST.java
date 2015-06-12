/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.itcs.jpautils.EasyCriteriaQuery;
import com.unlockspaces.persistence.entities.Reservation;
import com.unlockspaces.persistence.entities.Reservation_;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import java.net.URI;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("venues")
public class VenueFacadeREST extends AbstractFacade<Venue> {

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public VenueFacadeREST() {
        super(Venue.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    //@HeaderParam("token") String token
    public Response createVenue(@Context HttpHeaders headers, Venue entity) {

//        Usuario usuarioFromHeader = getUsuarioFromHeader(headers);
        String userID = getLoggedUserId(headers);
        System.out.println("userID:" + userID);
//        usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByEmail").setParameter("email", userData.getEmail()).getSingleResult();

        try {

            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);

            System.out.println("entity:" + entity);
            entity.setCreationDate(new Date());
            entity.setCreatedBy(findUsuarioByUserId);
            super.create(entity);
//            long venueId = entity.getId();

            return Response.created(URI.create("/#/app/venues/list")).entity(entity).build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(e,
                    Response.Status.INTERNAL_SERVER_ERROR);
        }

    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Long id, Venue entity) {
        try {
            super.edit(entity);
        } catch (Exception ex) {
            Logger.getLogger(VenueFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
            throw new WebApplicationException(ex,
                    Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("{id}")
    public Response remove(@PathParam("id") Long id) {
        try {
            Venue venue = super.find(id);
//            boolean hasReservations = false;
            if (!venue.getSpaces().isEmpty()) {
                List<Space> spaces = venue.getSpaces();
                for (Space space : spaces) {
                    EasyCriteriaQuery<Reservation> query = new EasyCriteriaQuery<>(em, Reservation.class);
                    query.addEqualPredicate(Reservation_.space.getName(), space);
                    Long count = query.count();
                    if (count > 0) {
                        return getNoCacheResponseBuilder(Response.Status.OK).entity("El venue tiene spaces con reservations").build();
                    }
                }
            }
            super.remove(super.find(id));
            return getCacheResponseBuilder(Response.Status.OK).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Venue find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Produces({"application/json"})
    public List<Venue> findVenuesByUser(@Context HttpHeaders headers) {

        try {
            String userID = getLoggedUserId(headers);
            System.out.println("userID:" + userID);
            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);
//            final Usuario usuarioFromSession = getUsuarioFromSession(request);
//            Usuario usuarioFromHeader = getUsuarioFromHeader(headers);

            final List<Venue> findVenuesByUser = findVenuesByUser(findUsuarioByUserId, null);
            return findVenuesByUser;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Collections.EMPTY_LIST;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Venue> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
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
