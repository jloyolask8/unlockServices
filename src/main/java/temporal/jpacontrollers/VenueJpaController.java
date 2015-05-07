/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Venue;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.UserTransaction;
import temporal.jpacontrollers.exceptions.NonexistentEntityException;
import temporal.jpacontrollers.exceptions.RollbackFailureException;

/**
 *
 * @author jonathan
 */
public class VenueJpaController implements Serializable {

    public VenueJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Venue venue) throws RollbackFailureException, Exception {
        if (venue.getSpaces() == null) {
            venue.setSpaces(new ArrayList<Space>());
        }
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Usuario createdBy = venue.getCreatedBy();
            if (createdBy != null) {
                createdBy = em.getReference(createdBy.getClass(), createdBy.getSystemId());
                venue.setCreatedBy(createdBy);
            }
            List<Space> attachedSpaces = new ArrayList<Space>();
            for (Space spacesSpaceToAttach : venue.getSpaces()) {
                spacesSpaceToAttach = em.getReference(spacesSpaceToAttach.getClass(), spacesSpaceToAttach.getId());
                attachedSpaces.add(spacesSpaceToAttach);
            }
            venue.setSpaces(attachedSpaces);
            em.persist(venue);
            if (createdBy != null) {
                createdBy.getVenuesListed().add(venue);
                createdBy = em.merge(createdBy);
            }
            for (Space spacesSpace : venue.getSpaces()) {
                Venue oldVenueOfSpacesSpace = spacesSpace.getVenue();
                spacesSpace.setVenue(venue);
                spacesSpace = em.merge(spacesSpace);
                if (oldVenueOfSpacesSpace != null) {
                    oldVenueOfSpacesSpace.getSpaces().remove(spacesSpace);
                    oldVenueOfSpacesSpace = em.merge(oldVenueOfSpacesSpace);
                }
            }
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Venue venue) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
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
            List<Space> attachedSpacesNew = new ArrayList<Space>();
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
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Long id = venue.getId();
                if (findVenue(id) == null) {
                    throw new NonexistentEntityException("The venue with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(Long id) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Venue venue;
            try {
                venue = em.getReference(Venue.class, id);
                venue.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The venue with id " + id + " no longer exists.", enfe);
            }
            Usuario createdBy = venue.getCreatedBy();
            if (createdBy != null) {
                createdBy.getVenuesListed().remove(venue);
                createdBy = em.merge(createdBy);
            }
            List<Space> spaces = venue.getSpaces();
            for (Space spacesSpace : spaces) {
                spacesSpace.setVenue(null);
                spacesSpace = em.merge(spacesSpace);
            }
            em.remove(venue);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Venue> findVenueEntities() {
        return findVenueEntities(true, -1, -1);
    }

    public List<Venue> findVenueEntities(int maxResults, int firstResult) {
        return findVenueEntities(false, maxResults, firstResult);
    }

    private List<Venue> findVenueEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Venue.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public Venue findVenue(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Venue.class, id);
        } finally {
            em.close();
        }
    }

    public int getVenueCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Venue> rt = cq.from(Venue.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
