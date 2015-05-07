/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package temporal.jpacontrollers;

import com.unlockspaces.persistence.entities.Organization;
import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.ArrayList;
import java.util.Collection;
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
public class OrganizationJpaController implements Serializable {

    public OrganizationJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Organization organization) throws RollbackFailureException, Exception {
        if (organization.getUsers() == null) {
            organization.setUsers(new ArrayList<Usuario>());
        }
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Collection<Usuario> attachedUsers = new ArrayList<Usuario>();
            for (Usuario usersUsuarioToAttach : organization.getUsers()) {
                usersUsuarioToAttach = em.getReference(usersUsuarioToAttach.getClass(), usersUsuarioToAttach.getSystemId());
                attachedUsers.add(usersUsuarioToAttach);
            }
            organization.setUsers(attachedUsers);
            em.persist(organization);
            for (Usuario usersUsuario : organization.getUsers()) {
                Organization oldOrganizationOfUsersUsuario = usersUsuario.getOrganization();
                usersUsuario.setOrganization(organization);
                usersUsuario = em.merge(usersUsuario);
                if (oldOrganizationOfUsersUsuario != null) {
                    oldOrganizationOfUsersUsuario.getUsers().remove(usersUsuario);
                    oldOrganizationOfUsersUsuario = em.merge(oldOrganizationOfUsersUsuario);
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

    public void edit(Organization organization) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Organization persistentOrganization = em.find(Organization.class, organization.getId());
            Collection<Usuario> usersOld = persistentOrganization.getUsers();
            Collection<Usuario> usersNew = organization.getUsers();
            Collection<Usuario> attachedUsersNew = new ArrayList<Usuario>();
            for (Usuario usersNewUsuarioToAttach : usersNew) {
                usersNewUsuarioToAttach = em.getReference(usersNewUsuarioToAttach.getClass(), usersNewUsuarioToAttach.getSystemId());
                attachedUsersNew.add(usersNewUsuarioToAttach);
            }
            usersNew = attachedUsersNew;
            organization.setUsers(usersNew);
            organization = em.merge(organization);
            for (Usuario usersOldUsuario : usersOld) {
                if (!usersNew.contains(usersOldUsuario)) {
                    usersOldUsuario.setOrganization(null);
                    usersOldUsuario = em.merge(usersOldUsuario);
                }
            }
            for (Usuario usersNewUsuario : usersNew) {
                if (!usersOld.contains(usersNewUsuario)) {
                    Organization oldOrganizationOfUsersNewUsuario = usersNewUsuario.getOrganization();
                    usersNewUsuario.setOrganization(organization);
                    usersNewUsuario = em.merge(usersNewUsuario);
                    if (oldOrganizationOfUsersNewUsuario != null && !oldOrganizationOfUsersNewUsuario.equals(organization)) {
                        oldOrganizationOfUsersNewUsuario.getUsers().remove(usersNewUsuario);
                        oldOrganizationOfUsersNewUsuario = em.merge(oldOrganizationOfUsersNewUsuario);
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
                Long id = organization.getId();
                if (findOrganization(id) == null) {
                    throw new NonexistentEntityException("The organization with id " + id + " no longer exists.");
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
            Organization organization;
            try {
                organization = em.getReference(Organization.class, id);
                organization.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The organization with id " + id + " no longer exists.", enfe);
            }
            Collection<Usuario> users = organization.getUsers();
            for (Usuario usersUsuario : users) {
                usersUsuario.setOrganization(null);
                usersUsuario = em.merge(usersUsuario);
            }
            em.remove(organization);
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

    public List<Organization> findOrganizationEntities() {
        return findOrganizationEntities(true, -1, -1);
    }

    public List<Organization> findOrganizationEntities(int maxResults, int firstResult) {
        return findOrganizationEntities(false, maxResults, firstResult);
    }

    private List<Organization> findOrganizationEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Organization.class));
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

    public Organization findOrganization(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Organization.class, id);
        } finally {
            em.close();
        }
    }

    public int getOrganizationCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Organization> rt = cq.from(Organization.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
