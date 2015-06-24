/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import com.unlockspaces.persistence.entities.CancelationPolicy;
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
import temporal.jpacontrollers.exceptions.RollbackFailureException;

/**
 *
 * @author jonathan
 */
public class CancelationPolicyJpaController implements Serializable {

    public CancelationPolicyJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(CancelationPolicy cancelationPolicy) throws RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            em.persist(cancelationPolicy);
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

    public void edit(CancelationPolicy cancelationPolicy) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            cancelationPolicy = em.merge(cancelationPolicy);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                String id = cancelationPolicy.getId();
                if (findCancelationPolicy(id) == null) {
                    throw new NonexistentEntityException("The cancelationPolicy with id " + id + " no longer exists.");
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
            CancelationPolicy cancelationPolicy;
            try {
                cancelationPolicy = em.getReference(CancelationPolicy.class, id);
                cancelationPolicy.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The cancelationPolicy with id " + id + " no longer exists.", enfe);
            }
            em.remove(cancelationPolicy);
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

    public List<CancelationPolicy> findCancelationPolicyEntities() {
        return findCancelationPolicyEntities(true, -1, -1);
    }

    public List<CancelationPolicy> findCancelationPolicyEntities(int maxResults, int firstResult) {
        return findCancelationPolicyEntities(false, maxResults, firstResult);
    }

    private List<CancelationPolicy> findCancelationPolicyEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(CancelationPolicy.class));
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

    public CancelationPolicy findCancelationPolicy(String id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(CancelationPolicy.class, id);
        } finally {
            em.close();
        }
    }

    public int getCancelationPolicyCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<CancelationPolicy> rt = cq.from(CancelationPolicy.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
