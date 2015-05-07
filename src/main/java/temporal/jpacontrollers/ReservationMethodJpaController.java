/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import com.unlockspaces.persistence.entities.ReservationMethod;
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
public class ReservationMethodJpaController implements Serializable {

    public ReservationMethodJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(ReservationMethod reservationMethod) throws PreexistingEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            em.persist(reservationMethod);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            if (findReservationMethod(reservationMethod.getId()) != null) {
                throw new PreexistingEntityException("ReservationMethod " + reservationMethod + " already exists.", ex);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(ReservationMethod reservationMethod) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            reservationMethod = em.merge(reservationMethod);
            utx.commit();
        } catch (Exception ex) {
            try {
                utx.rollback();
            } catch (Exception re) {
                throw new RollbackFailureException("An error occurred attempting to roll back the transaction.", re);
            }
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                String id = reservationMethod.getId();
                if (findReservationMethod(id) == null) {
                    throw new NonexistentEntityException("The reservationMethod with id " + id + " no longer exists.");
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
            ReservationMethod reservationMethod;
            try {
                reservationMethod = em.getReference(ReservationMethod.class, id);
                reservationMethod.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The reservationMethod with id " + id + " no longer exists.", enfe);
            }
            em.remove(reservationMethod);
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

    public List<ReservationMethod> findReservationMethodEntities() {
        return findReservationMethodEntities(true, -1, -1);
    }

    public List<ReservationMethod> findReservationMethodEntities(int maxResults, int firstResult) {
        return findReservationMethodEntities(false, maxResults, firstResult);
    }

    private List<ReservationMethod> findReservationMethodEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(ReservationMethod.class));
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

    public ReservationMethod findReservationMethod(String id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(ReservationMethod.class, id);
        } finally {
            em.close();
        }
    }

    public int getReservationMethodCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<ReservationMethod> rt = cq.from(ReservationMethod.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
