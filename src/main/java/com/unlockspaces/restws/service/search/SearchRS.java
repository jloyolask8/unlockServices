/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service.search;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.restws.service.AbstractFacade;
import java.io.ByteArrayOutputStream;
import java.util.LinkedList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.GET;
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
import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("findspaces")
public class SearchRS extends AbstractFacade<Space> {

    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public SearchRS() {
        super(Space.class);
    }
    
    

    @Override
    protected EntityManager getEntityManager() {
        return em;
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll_() {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(marshallSpace(super.findAll())).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();

    }
    
    @GET
    @Path("searchVenuesLatLong/{latitude}/{longitude}")
    @Produces({"application/xml", "application/json"})
    public List<Venue> searchVenuesLatLong(@PathParam("latitude") String latitude, @PathParam("longitude") String longitude) {
        //10000 meters setted only for test purposes
        List<Venue> result = null;
        try {
            result = findVenuesOnRadio(latitude, longitude, 10000);
//        Gson gson= new Gson();
//        String resultString = gson.toJson(result);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
        //Jorge's search here
    } 

    @GET
    @Path("searchSpacesLatLong/{latitude}/{longitude}/{radiometers}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchSpacesLatLong(@PathParam("latitude") String latitude, @PathParam("longitude") String longitude,
            @PathParam("radiometers") int radiometers) {
        try {
            return getCacheResponseBuilder(Response.Status.OK).entity(marshallSpace(findSpacesOnRadio(latitude, longitude, radiometers))).build();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getNoCacheResponseBuilder(Response.Status.INTERNAL_SERVER_ERROR).build();
        //Jorge's search here
    }
    
    
    public List<Space> findSpacesOnRadio(String lat, String lon, int meters) {
        EntityManager em = null;
        String centerLocation = lon + ' ' + lat;
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("findSpacesOnRadio(" + centerLocation + "," + meters + ")");
            long startTime = System.currentTimeMillis();
            //**************************/
            Query query = em.createNativeQuery("select space.id,space.capacity,space.creationdate,"
                    + "space.lastmodifdate,space.summary,space.title,space.mode,space.perday,space.perhour,"
                    + "space.permonth,space.perweek,space.currencycode,space.createdby_systemid,space.venue_id,"
                    + "space.cancelationpolicy_id,space.category_id,space.frontphoto,space.reservationmethod_id,space.spacestatus_id,"
                    + "space.type_id,space.geom4326,space.latitude,space.longitude, ST_Distance(ST_Transform(geom4326,32719), "
                    + "ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) as distance\n"
                    + "from (SELECT id\n"
                    + " FROM space\n"
                    + " WHERE ST_Distance(ST_Transform(geom4326,32719), ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) < " + meters + ") locaciones, space"
                    + " where locaciones.id = space.id"
                    + " order by distance;", Space.class);
            query.setHint(QueryHints.REFRESH, HintValues.TRUE);

            List<Space> results = query.getResultList();
            //Debug purposes
            long elapsedTime = System.currentTimeMillis() - startTime;
            System.out.println("query return " + results.size() + " results in " + elapsedTime + " milliseconds");
            //*****************************/
            return results;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
//            if (em != null) {
//                em.close();
//            }
        }
        return new LinkedList();
    }

    public List<Venue> findVenuesOnRadio(String lat, String lon, int meters) {
        EntityManager em = null;
        String centerLocation = lon + ' ' + lat;
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("findVenuesOnRadio(" + centerLocation + "," + meters + ")");
            long startTime = System.currentTimeMillis();
            //**************************/

            String findVenuesQuery = "SELECT o.id,o.creationdate,o.lastmodifdate,o.timezone,o.addressonmap,\n"
                    + "o.latitude,o.line1,o.line2,o.longitude,o.postalcode,o.region,o.city_id_code,\n"
                    + "o.country_id_code,o.email,o.name,o.phone,o.skype,o.website,o.whatsapp,\n"
                    + "o.fridayavailabilityoption,o.fridayendtime,o.fridaystarttime,o.mondayavailabilityoption,\n"
                    + "o.mondayendtime,o.mondaystarttime,o.saturdayavailabilityoption,o.saturdayendtime,\n"
                    + "o.saturdaystarttime,o.sundayavailabilityoption,o.sundayendtime,o.sundaystarttime,\n"
                    + "o.thursdayavailabilityoption,o.thursdayendtime,o.thursdaystarttime,o.tuesdayavailabilityoption,\n"
                    + "o.tuesdayendtime,o.tuesdaystarttime,o.wednesdayavailabilityoption,o.wednesdayendtime,\n"
                    + "o.wednesdaystarttime,o.summary,o.title,o.createdby_systemid,o.frontphoto,o.organization_id,\n"
                    + "o.venuelogo,ST_Distance(ST_Transform(geom4326,32719), \n"
                    + "ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) as distance from (SELECT id\n"
                    + " FROM venue\n"
                    + " WHERE ST_Distance(ST_Transform(geom4326,32719), ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) < " + meters + ") locaciones, venue as o\n"
                    + " where locaciones.id = o.id\n"
                    + " order by distance;";

            Query query = em.createNativeQuery(findVenuesQuery, Venue.class);
            query.setHint(QueryHints.REFRESH, HintValues.TRUE);

            List<Venue> results = query.getResultList();
            //Debug purposes
            long elapsedTime = System.currentTimeMillis() - startTime;
            System.out.println("query return " + results.size() + " results in " + elapsedTime + " milliseconds");
            //*****************************/
            return results;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new LinkedList();
    }
    
    public void updateGeom4326(Space space) {
        EntityManager em = null;
        String centerLocation = space.getAddress().getLongitude() + ' ' + space.getAddress().getLatitude();
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("updateGeom4326 title="+space.toString()+" id="+space.getId()+"(" + centerLocation + ")");

            Query query = em.createNativeQuery("UPDATE space\n"
                    + "   SET geom4326=ST_GeomFromText('POINT(" + centerLocation + ")', 4326)\n"
                    + " WHERE space.id = "+space.getId());
            query.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
//            if (em != null) {
//                em.close();
//            }
        }
    }

   
}
