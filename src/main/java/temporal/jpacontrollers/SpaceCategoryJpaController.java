/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import com.unlockspaces.persistence.entities.SpaceCategory;
import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.UserTransaction;
import temporal.jpacontrollers.exceptions.NonexistentEntityException;
import temporal.jpacontrollers.exceptions.PreexistingEntityException;
import temporal.jpacontrollers.exceptions.RollbackFailureException;

/**
 *
 * @author jonathan
 */
public class SpaceCategoryJpaController implements Serializable {

    public SpaceCategoryJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(SpaceCategory spaceCategory) throws PreexistingEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            em.persist(spaceCategory);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            if (findSpaceCategory(spaceCategory.getId()) != null) {
                throw new PreexistingEntityException("SpaceCategory " + spaceCategory + " already exists.", ex);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(SpaceCategory spaceCategory) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            spaceCategory = em.merge(spaceCategory);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                String id = spaceCategory.getId();
                if (findSpaceCategory(id) == null) {
                    throw new NonexistentEntityException("The spaceCategory with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(String id) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            SpaceCategory spaceCategory;
            try {
                spaceCategory = em.getReference(SpaceCategory.class, id);
                spaceCategory.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The spaceCategory with id " + id + " no longer exists.", enfe);
            }
            em.remove(spaceCategory);
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

    public List<SpaceCategory> findSpaceCategoryEntities() {
        return findSpaceCategoryEntities(true, -1, -1);
    }

    public List<SpaceCategory> findSpaceCategoryEntities(int maxResults, int firstResult) {
        return findSpaceCategoryEntities(false, maxResults, firstResult);
    }

    private List<SpaceCategory> findSpaceCategoryEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(SpaceCategory.class));
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

    public SpaceCategory findSpaceCategory(String id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(SpaceCategory.class, id);
        } finally {
            em.close();
        }
    }

    public int getSpaceCategoryCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<SpaceCategory> rt = cq.from(SpaceCategory.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
