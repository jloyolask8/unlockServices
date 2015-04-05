/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.ejb;

import com.unlockspaces.persistence.entities.Venue;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author jonathan
 */
@Stateless
public class VenueFacade extends AbstractFacade<Venue> {
    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public VenueFacade() {
        super(Venue.class);
    }

    @Override
    public void create(Venue entity) {
        super.create(entity);
        updateGeom4326(entity);
    }

    @Override
    public void edit(Venue entity) {
        super.edit(entity);
        updateGeom4326(entity);
    }
    
    public void updateGeom4326(Venue venue) {
        EntityManager em = null;
        String centerLocation = venue.getAddress().getLongitude() + ' ' + venue.getAddress().getLatitude();
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("updateGeom4326 venue title="+venue.toString()+" id="+venue.getId()+"(" + centerLocation + ")");

            Query query = em.createNativeQuery("UPDATE venue\n"
                    + "   SET geom4326=ST_GeomFromText('POINT(" + centerLocation + ")', 4326)\n"
                    + " WHERE venue.id = "+venue.getId());
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
