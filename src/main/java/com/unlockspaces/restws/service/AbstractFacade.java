/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.Space;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;

/**
 *
 * @author jonathan
 */
public abstract class AbstractFacade<T> {
    private Class<T> entityClass;

    public AbstractFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    protected abstract EntityManager getEntityManager();

    public void create(T entity) {
        getEntityManager().persist(entity);
    }

    public void edit(T entity) {
        getEntityManager().merge(entity);
    }

    public void remove(T entity) {
        getEntityManager().remove(getEntityManager().merge(entity));
    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }

    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        javax.persistence.criteria.Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }
    
    public List findSpacesOnRadio(String lat, String lon, int meters) {
        EntityManager em = null;
        String centerLocation = lon+' '+lat;
        try {
            em = getEntityManager();
            //Debug purposes
            System.out.println("findMerchantsOnRadio(" + centerLocation + "," + meters + ")");
            long startTime = System.currentTimeMillis();
            //**************************/
            Query query = em.createNativeQuery("select *, ST_Distance(ST_Transform(locaciones.geom4326,32719), "
                    + "ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) as distance\n"
                    + "from (SELECT *\n"
                    + " FROM space\n"
                    + " WHERE ST_Distance(ST_Transform(geom4326,32719), ST_Transform(ST_GeomFromText('POINT(" + centerLocation + ")', 4326),32719)) < " + meters + ") locaciones"
                    + " order by distance;", Space.class);
            List<Space> results = query.getResultList();
            //Debug purposes
            long elapsedTime = System.currentTimeMillis() - startTime;
            System.out.println("query return " + results.size() + " results in " + elapsedTime + " milliseconds");
            //*****************************/
            return results;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (em != null) {
                em.close();
            }
        }
        return new LinkedList();
    }
    
}
