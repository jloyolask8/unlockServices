/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Venue;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
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
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.PropertyException;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("spaces")
public class SpaceFacadeREST extends AbstractFacade<Space> {

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public SpaceFacadeREST() {
        super(Space.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Space entity) {
        System.out.println("create space!!!");
        super.create(entity);
//        super.updateGeom4326(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Space entity) {
        super.edit(entity);
//        super.updateGeom4326(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id.longValue()));
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(super.find(id.longValue())).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
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
