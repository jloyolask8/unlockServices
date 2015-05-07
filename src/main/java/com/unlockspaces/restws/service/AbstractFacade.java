/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.transaction.UserTransaction;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Response;
import temporal.jpacontrollers.exceptions.NonexistentEntityException;
import temporal.jpacontrollers.exceptions.RollbackFailureException;

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
        getEntityManager().flush();
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

    public Response.ResponseBuilder getCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(false);
        cc.setMaxAge(300);
        cc.setMustRevalidate(false);
        return Response.status(status).cacheControl(cc);
    }

    public Response.ResponseBuilder getNoCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(true);
        cc.setMaxAge(-1);
        cc.setMustRevalidate(true);
        return Response.status(status).cacheControl(cc);
    }

    @TransactionAttribute(value = TransactionAttributeType.REQUIRED)
    public void editarVenue(Venue venue) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
//            utx.begin();
            em = getEntityManager();
            Venue persistentVenue = em.find(Venue.class, venue.getId());
            Usuario createdByOld = persistentVenue.getCreatedBy();
            Usuario createdByNew = venue.getCreatedBy();
            List<Space> spacesOld = persistentVenue.getSpaces();
            List<Space> spacesNew = venue.getSpaces();
            if (createdByNew != null) {
                createdByNew = em.getReference(createdByNew.getClass(), createdByNew.getSystemId());
                venue.setCreatedBy(createdByNew);
            }
            List<Space> attachedSpacesNew = new ArrayList<>();
            for (Space spacesNewSpaceToAttach : spacesNew) {
                spacesNewSpaceToAttach = em.getReference(spacesNewSpaceToAttach.getClass(), spacesNewSpaceToAttach.getId());
                attachedSpacesNew.add(spacesNewSpaceToAttach);
            }
            spacesNew = attachedSpacesNew;
            venue.setSpaces(spacesNew);
            venue = em.merge(venue);
            if (createdByOld != null && !createdByOld.equals(createdByNew)) {
                createdByOld.getVenuesListed().remove(venue);
                createdByOld = em.merge(createdByOld);
            }
            if (createdByNew != null && !createdByNew.equals(createdByOld)) {
                createdByNew.getVenuesListed().add(venue);
                createdByNew = em.merge(createdByNew);
            }
            for (Space spacesOldSpace : spacesOld) {
                if (!spacesNew.contains(spacesOldSpace)) {
                    spacesOldSpace.setVenue(null);
                    spacesOldSpace = em.merge(spacesOldSpace);
                }
            }
            for (Space spacesNewSpace : spacesNew) {
                if (!spacesOld.contains(spacesNewSpace)) {
                    Venue oldVenueOfSpacesNewSpace = spacesNewSpace.getVenue();
                    spacesNewSpace.setVenue(venue);
                    spacesNewSpace = em.merge(spacesNewSpace);
                    if (oldVenueOfSpacesNewSpace != null && !oldVenueOfSpacesNewSpace.equals(venue)) {
                        oldVenueOfSpacesNewSpace.getSpaces().remove(spacesNewSpace);
                        oldVenueOfSpacesNewSpace = em.merge(oldVenueOfSpacesNewSpace);
                    }
                }
            }
//            utx.commit();
        } catch (Exception ex) {
         
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Long id = venue.getId();
                if (find(id) == null) {
                    throw new NonexistentEntityException("The venue with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } 
//        finally {
////            if (em != null) {
////                em.close();
////            }
//        }
    }

}
