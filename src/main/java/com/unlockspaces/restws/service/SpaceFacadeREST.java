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

    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
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
        super.updateGeom4326(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({"application/xml", "application/json"})
    public void edit(@PathParam("id") Integer id, Space entity) {
        super.edit(entity);
        super.updateGeom4326(entity);
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
            return getCacheResponseBuilder(Response.Status.OK).entity(marshallSpace(super.find(id.longValue()))).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll_() {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(marshallSpace(super.findAll())).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();

    }

    private String marshallSpace(Object toMarshall) throws PropertyException, JAXBException {
        String json;
        JAXBContext jc = JAXBContext.newInstance(Space.class);
        Marshaller marshaller = jc.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        marshaller.setProperty("eclipselink.media-type", "application/json");
        marshaller.setProperty("eclipselink.json.include-root", false);
        //marshaller.setProperty(Marshaller.JAXB_ENCODING, StandardCharsets.ISO_8859_1.name());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        marshaller.marshal(toMarshall, baos);
        json = baos.toString(/*StandardCharsets.ISO_8859_1.name()*/);
        return json;
    }

    @GET
    @Path("searchSpacesLatLong/{latitude}/{longitude}/{radiometers}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchSpacesLatLong(@PathParam("latitude") String latitude, @PathParam("longitude") String longitude,
            @PathParam("radiometers") int radiometers) {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(marshallSpace(super.findSpacesOnRadio(latitude, longitude, radiometers))).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
        //Jorge's search here
    }

    @GET
    @Path("searchVenuesLatLong/{latitude}/{longitude}")
    @Produces({"application/xml", "application/json"})
    public List<Venue> searchVenuesLatLong(@PathParam("latitude") String latitude, @PathParam("longitude") String longitude) {
        //10000 meters setted only for test purposes
        List<Venue> result = null;
        try {
            result = super.findVenuesOnRadio(latitude, longitude, 10000);
//        Gson gson= new Gson();
//        String resultString = gson.toJson(result);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
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
    
    private Response.ResponseBuilder getCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(false);
        cc.setMaxAge(300);
        cc.setMustRevalidate(false);
        return Response.status(status).cacheControl(cc).header("Access-Control-Allow-Origin", "*");
    }

    private Response.ResponseBuilder getNoCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(true);
        cc.setMaxAge(-1);
        cc.setMustRevalidate(true);
        return Response.status(status).cacheControl(cc).header("Access-Control-Allow-Origin", "*");
    }

}
