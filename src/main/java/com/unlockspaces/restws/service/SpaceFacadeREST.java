/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.SpaceD;
import java.util.Collections;
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

/**
 *
 * @author jonathan
 */
@Stateless
@Path("spaces")
public class SpaceFacadeREST extends AbstractFacade<Space> {
    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public SpaceFacadeREST() {
        super(Space.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Space entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Space entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Space find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Space> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{latitude}/{longitude}")
    @Produces({"application/xml", "application/json"})
    public List<SpaceD> searchLatLong(@PathParam("latitude") String latitude, @PathParam("longitude") String longitude) {
        //10000 meters setted only for test purposes
        return super.findSpacesOnRadio(latitude, longitude, 10000);
        //Jorge's search here
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
