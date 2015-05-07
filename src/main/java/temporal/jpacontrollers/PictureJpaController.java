/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import com.unlockspaces.persistence.entities.Picture;
import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import com.unlockspaces.persistence.entities.Space;
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
public class PictureJpaController implements Serializable {

    public PictureJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Picture picture) throws RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Space space = picture.getSpace();
            if (space != null) {
                space = em.getReference(space.getClass(), space.getId());
                picture.setSpace(space);
            }
            em.persist(picture);
            if (space != null) {
                space.getPhotos().add(picture);
                space = em.merge(space);
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

    public void edit(Picture picture) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Picture persistentPicture = em.find(Picture.class, picture.getId());
            Space spaceOld = persistentPicture.getSpace();
            Space spaceNew = picture.getSpace();
            if (spaceNew != null) {
                spaceNew = em.getReference(spaceNew.getClass(), spaceNew.getId());
                picture.setSpace(spaceNew);
            }
            picture = em.merge(picture);
            if (spaceOld != null && !spaceOld.equals(spaceNew)) {
                spaceOld.getPhotos().remove(picture);
                spaceOld = em.merge(spaceOld);
            }
            if (spaceNew != null && !spaceNew.equals(spaceOld)) {
                spaceNew.getPhotos().add(picture);
                spaceNew = em.merge(spaceNew);
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
                Long id = picture.getId();
                if (findPicture(id) == null) {
                    throw new NonexistentEntityException("The picture with id " + id + " no longer exists.");
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
            Picture picture;
            try {
                picture = em.getReference(Picture.class, id);
                picture.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The picture with id " + id + " no longer exists.", enfe);
            }
            Space space = picture.getSpace();
            if (space != null) {
                space.getPhotos().remove(picture);
                space = em.merge(space);
            }
            em.remove(picture);
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

    public List<Picture> findPictureEntities() {
        return findPictureEntities(true, -1, -1);
    }

    public List<Picture> findPictureEntities(int maxResults, int firstResult) {
        return findPictureEntities(false, maxResults, firstResult);
    }

    private List<Picture> findPictureEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Picture.class));
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

    public Picture findPicture(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Picture.class, id);
        } finally {
            em.close();
        }
    }

    public int getPictureCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Picture> rt = cq.from(Picture.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
