/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.ejb;

import com.unlockspaces.persistence.entities.Space;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author jonathan
 */
@Stateless
public class SpaceFacade extends AbstractFacade<Space> {

    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public SpaceFacade() {
        super(Space.class);
    }

    @Override
    public void create(Space entity) {
        super.create(entity); //To change body of generated methods, choose Tools | Templates.
        updateGeom4326(entity);
    }

    @Override
    public void edit(Space entity) {
        super.edit(entity); //To change body of generated methods, choose Tools | Templates.
        updateGeom4326(entity);
    }

    public void updateGeom4326(Space space) {
        EntityManager em = null;
        String centerLocation = space.getAddress().getLongitude() + ' ' + space.getAddress().getLatitude();
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("updateGeom4326(" + centerLocation + ")");

            //**************************/
//            Query query = em.createNativeQuery("select *, ST_Distance(ST_Transform(locaciones.geom4326,32719), "
//                    + "ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) as distance\n"
//                    + "from (SELECT *\n"
//                    + " FROM space\n"
//                    + " WHERE ST_Distance(ST_Transform(geom4326,32719), ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) < " + meters + ") locaciones"
//                    + " order by distance;", "distanceResult");
//            ALTER TABLE space ADD COLUMN distance double precision;
            Query query = em.createNativeQuery("UPDATE space\n"
                    + "   SET geom4326=ST_GeomFromText('POINT(" + centerLocation + ")', 4326)\n"
                    + " WHERE space.id = "+space.getId());
//            query.setHint(QueryHints.REFRESH, HintValues.TRUE);
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
