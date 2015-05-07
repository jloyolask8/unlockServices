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
import com.unlockspaces.persistence.entities.Organization;
import com.unlockspaces.persistence.entities.SpaceReview;
import java.util.ArrayList;
import java.util.Collection;
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.persistence.entities.UserNotification;
import com.unlockspaces.persistence.entities.Reservation;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
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
public class UsuarioJpaController implements Serializable {

    public UsuarioJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Usuario usuario) throws RollbackFailureException, Exception {
        if (usuario.getSpaceReviews() == null) {
            usuario.setSpaceReviews(new ArrayList<SpaceReview>());
        }
        if (usuario.getVenuesListed() == null) {
            usuario.setVenuesListed(new ArrayList<Venue>());
        }
        if (usuario.getNotificationsReceived() == null) {
            usuario.setNotificationsReceived(new ArrayList<UserNotification>());
        }
        if (usuario.getReservations() == null) {
            usuario.setReservations(new ArrayList<Reservation>());
        }
        if (usuario.getSpacesListed() == null) {
            usuario.setSpacesListed(new ArrayList<Space>());
        }
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Organization organization = usuario.getOrganization();
            if (organization != null) {
                organization = em.getReference(organization.getClass(), organization.getId());
                usuario.setOrganization(organization);
            }
            Collection<SpaceReview> attachedSpaceReviews = new ArrayList<SpaceReview>();
            for (SpaceReview spaceReviewsSpaceReviewToAttach : usuario.getSpaceReviews()) {
                spaceReviewsSpaceReviewToAttach = em.getReference(spaceReviewsSpaceReviewToAttach.getClass(), spaceReviewsSpaceReviewToAttach.getId());
                attachedSpaceReviews.add(spaceReviewsSpaceReviewToAttach);
            }
            usuario.setSpaceReviews(attachedSpaceReviews);
            Collection<Venue> attachedVenuesListed = new ArrayList<Venue>();
            for (Venue venuesListedVenueToAttach : usuario.getVenuesListed()) {
                venuesListedVenueToAttach = em.getReference(venuesListedVenueToAttach.getClass(), venuesListedVenueToAttach.getId());
                attachedVenuesListed.add(venuesListedVenueToAttach);
            }
            usuario.setVenuesListed(attachedVenuesListed);
            Collection<UserNotification> attachedNotificationsReceived = new ArrayList<UserNotification>();
            for (UserNotification notificationsReceivedUserNotificationToAttach : usuario.getNotificationsReceived()) {
                notificationsReceivedUserNotificationToAttach = em.getReference(notificationsReceivedUserNotificationToAttach.getClass(), notificationsReceivedUserNotificationToAttach.getId());
                attachedNotificationsReceived.add(notificationsReceivedUserNotificationToAttach);
            }
            usuario.setNotificationsReceived(attachedNotificationsReceived);
            Collection<Reservation> attachedReservations = new ArrayList<Reservation>();
            for (Reservation reservationsReservationToAttach : usuario.getReservations()) {
                reservationsReservationToAttach = em.getReference(reservationsReservationToAttach.getClass(), reservationsReservationToAttach.getId());
                attachedReservations.add(reservationsReservationToAttach);
            }
            usuario.setReservations(attachedReservations);
            Collection<Space> attachedSpacesListed = new ArrayList<Space>();
            for (Space spacesListedSpaceToAttach : usuario.getSpacesListed()) {
                spacesListedSpaceToAttach = em.getReference(spacesListedSpaceToAttach.getClass(), spacesListedSpaceToAttach.getId());
                attachedSpacesListed.add(spacesListedSpaceToAttach);
            }
            usuario.setSpacesListed(attachedSpacesListed);
            em.persist(usuario);
            if (organization != null) {
                organization.getUsers().add(usuario);
                organization = em.merge(organization);
            }
            for (SpaceReview spaceReviewsSpaceReview : usuario.getSpaceReviews()) {
                Usuario oldReviewedByOfSpaceReviewsSpaceReview = spaceReviewsSpaceReview.getReviewedBy();
                spaceReviewsSpaceReview.setReviewedBy(usuario);
                spaceReviewsSpaceReview = em.merge(spaceReviewsSpaceReview);
                if (oldReviewedByOfSpaceReviewsSpaceReview != null) {
                    oldReviewedByOfSpaceReviewsSpaceReview.getSpaceReviews().remove(spaceReviewsSpaceReview);
                    oldReviewedByOfSpaceReviewsSpaceReview = em.merge(oldReviewedByOfSpaceReviewsSpaceReview);
                }
            }
            for (Venue venuesListedVenue : usuario.getVenuesListed()) {
                Usuario oldCreatedByOfVenuesListedVenue = venuesListedVenue.getCreatedBy();
                venuesListedVenue.setCreatedBy(usuario);
                venuesListedVenue = em.merge(venuesListedVenue);
                if (oldCreatedByOfVenuesListedVenue != null) {
                    oldCreatedByOfVenuesListedVenue.getVenuesListed().remove(venuesListedVenue);
                    oldCreatedByOfVenuesListedVenue = em.merge(oldCreatedByOfVenuesListedVenue);
                }
            }
            for (UserNotification notificationsReceivedUserNotification : usuario.getNotificationsReceived()) {
                Usuario oldTargetUserOfNotificationsReceivedUserNotification = notificationsReceivedUserNotification.getTargetUser();
                notificationsReceivedUserNotification.setTargetUser(usuario);
                notificationsReceivedUserNotification = em.merge(notificationsReceivedUserNotification);
                if (oldTargetUserOfNotificationsReceivedUserNotification != null) {
                    oldTargetUserOfNotificationsReceivedUserNotification.getNotificationsReceived().remove(notificationsReceivedUserNotification);
                    oldTargetUserOfNotificationsReceivedUserNotification = em.merge(oldTargetUserOfNotificationsReceivedUserNotification);
                }
            }
            for (Reservation reservationsReservation : usuario.getReservations()) {
                Usuario oldReservedByOfReservationsReservation = reservationsReservation.getReservedBy();
                reservationsReservation.setReservedBy(usuario);
                reservationsReservation = em.merge(reservationsReservation);
                if (oldReservedByOfReservationsReservation != null) {
                    oldReservedByOfReservationsReservation.getReservations().remove(reservationsReservation);
                    oldReservedByOfReservationsReservation = em.merge(oldReservedByOfReservationsReservation);
                }
            }
            for (Space spacesListedSpace : usuario.getSpacesListed()) {
                Usuario oldCreatedByOfSpacesListedSpace = spacesListedSpace.getCreatedBy();
                spacesListedSpace.setCreatedBy(usuario);
                spacesListedSpace = em.merge(spacesListedSpace);
                if (oldCreatedByOfSpacesListedSpace != null) {
                    oldCreatedByOfSpacesListedSpace.getSpacesListed().remove(spacesListedSpace);
                    oldCreatedByOfSpacesListedSpace = em.merge(oldCreatedByOfSpacesListedSpace);
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

    public void edit(Usuario usuario) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Usuario persistentUsuario = em.find(Usuario.class, usuario.getSystemId());
            Organization organizationOld = persistentUsuario.getOrganization();
            Organization organizationNew = usuario.getOrganization();
            Collection<SpaceReview> spaceReviewsOld = persistentUsuario.getSpaceReviews();
            Collection<SpaceReview> spaceReviewsNew = usuario.getSpaceReviews();
            Collection<Venue> venuesListedOld = persistentUsuario.getVenuesListed();
            Collection<Venue> venuesListedNew = usuario.getVenuesListed();
            Collection<UserNotification> notificationsReceivedOld = persistentUsuario.getNotificationsReceived();
            Collection<UserNotification> notificationsReceivedNew = usuario.getNotificationsReceived();
            Collection<Reservation> reservationsOld = persistentUsuario.getReservations();
            Collection<Reservation> reservationsNew = usuario.getReservations();
            Collection<Space> spacesListedOld = persistentUsuario.getSpacesListed();
            Collection<Space> spacesListedNew = usuario.getSpacesListed();
            if (organizationNew != null) {
                organizationNew = em.getReference(organizationNew.getClass(), organizationNew.getId());
                usuario.setOrganization(organizationNew);
            }
            Collection<SpaceReview> attachedSpaceReviewsNew = new ArrayList<SpaceReview>();
            for (SpaceReview spaceReviewsNewSpaceReviewToAttach : spaceReviewsNew) {
                spaceReviewsNewSpaceReviewToAttach = em.getReference(spaceReviewsNewSpaceReviewToAttach.getClass(), spaceReviewsNewSpaceReviewToAttach.getId());
                attachedSpaceReviewsNew.add(spaceReviewsNewSpaceReviewToAttach);
            }
            spaceReviewsNew = attachedSpaceReviewsNew;
            usuario.setSpaceReviews(spaceReviewsNew);
            Collection<Venue> attachedVenuesListedNew = new ArrayList<Venue>();
            for (Venue venuesListedNewVenueToAttach : venuesListedNew) {
                venuesListedNewVenueToAttach = em.getReference(venuesListedNewVenueToAttach.getClass(), venuesListedNewVenueToAttach.getId());
                attachedVenuesListedNew.add(venuesListedNewVenueToAttach);
            }
            venuesListedNew = attachedVenuesListedNew;
            usuario.setVenuesListed(venuesListedNew);
            Collection<UserNotification> attachedNotificationsReceivedNew = new ArrayList<UserNotification>();
            for (UserNotification notificationsReceivedNewUserNotificationToAttach : notificationsReceivedNew) {
                notificationsReceivedNewUserNotificationToAttach = em.getReference(notificationsReceivedNewUserNotificationToAttach.getClass(), notificationsReceivedNewUserNotificationToAttach.getId());
                attachedNotificationsReceivedNew.add(notificationsReceivedNewUserNotificationToAttach);
            }
            notificationsReceivedNew = attachedNotificationsReceivedNew;
            usuario.setNotificationsReceived(notificationsReceivedNew);
            Collection<Reservation> attachedReservationsNew = new ArrayList<Reservation>();
            for (Reservation reservationsNewReservationToAttach : reservationsNew) {
                reservationsNewReservationToAttach = em.getReference(reservationsNewReservationToAttach.getClass(), reservationsNewReservationToAttach.getId());
                attachedReservationsNew.add(reservationsNewReservationToAttach);
            }
            reservationsNew = attachedReservationsNew;
            usuario.setReservations(reservationsNew);
            Collection<Space> attachedSpacesListedNew = new ArrayList<Space>();
            for (Space spacesListedNewSpaceToAttach : spacesListedNew) {
                spacesListedNewSpaceToAttach = em.getReference(spacesListedNewSpaceToAttach.getClass(), spacesListedNewSpaceToAttach.getId());
                attachedSpacesListedNew.add(spacesListedNewSpaceToAttach);
            }
            spacesListedNew = attachedSpacesListedNew;
            usuario.setSpacesListed(spacesListedNew);
            usuario = em.merge(usuario);
            if (organizationOld != null && !organizationOld.equals(organizationNew)) {
                organizationOld.getUsers().remove(usuario);
                organizationOld = em.merge(organizationOld);
            }
            if (organizationNew != null && !organizationNew.equals(organizationOld)) {
                organizationNew.getUsers().add(usuario);
                organizationNew = em.merge(organizationNew);
            }
            for (SpaceReview spaceReviewsOldSpaceReview : spaceReviewsOld) {
                if (!spaceReviewsNew.contains(spaceReviewsOldSpaceReview)) {
                    spaceReviewsOldSpaceReview.setReviewedBy(null);
                    spaceReviewsOldSpaceReview = em.merge(spaceReviewsOldSpaceReview);
                }
            }
            for (SpaceReview spaceReviewsNewSpaceReview : spaceReviewsNew) {
                if (!spaceReviewsOld.contains(spaceReviewsNewSpaceReview)) {
                    Usuario oldReviewedByOfSpaceReviewsNewSpaceReview = spaceReviewsNewSpaceReview.getReviewedBy();
                    spaceReviewsNewSpaceReview.setReviewedBy(usuario);
                    spaceReviewsNewSpaceReview = em.merge(spaceReviewsNewSpaceReview);
                    if (oldReviewedByOfSpaceReviewsNewSpaceReview != null && !oldReviewedByOfSpaceReviewsNewSpaceReview.equals(usuario)) {
                        oldReviewedByOfSpaceReviewsNewSpaceReview.getSpaceReviews().remove(spaceReviewsNewSpaceReview);
                        oldReviewedByOfSpaceReviewsNewSpaceReview = em.merge(oldReviewedByOfSpaceReviewsNewSpaceReview);
                    }
                }
            }
            for (Venue venuesListedOldVenue : venuesListedOld) {
                if (!venuesListedNew.contains(venuesListedOldVenue)) {
                    venuesListedOldVenue.setCreatedBy(null);
                    venuesListedOldVenue = em.merge(venuesListedOldVenue);
                }
            }
            for (Venue venuesListedNewVenue : venuesListedNew) {
                if (!venuesListedOld.contains(venuesListedNewVenue)) {
                    Usuario oldCreatedByOfVenuesListedNewVenue = venuesListedNewVenue.getCreatedBy();
                    venuesListedNewVenue.setCreatedBy(usuario);
                    venuesListedNewVenue = em.merge(venuesListedNewVenue);
                    if (oldCreatedByOfVenuesListedNewVenue != null && !oldCreatedByOfVenuesListedNewVenue.equals(usuario)) {
                        oldCreatedByOfVenuesListedNewVenue.getVenuesListed().remove(venuesListedNewVenue);
                        oldCreatedByOfVenuesListedNewVenue = em.merge(oldCreatedByOfVenuesListedNewVenue);
                    }
                }
            }
            for (UserNotification notificationsReceivedOldUserNotification : notificationsReceivedOld) {
                if (!notificationsReceivedNew.contains(notificationsReceivedOldUserNotification)) {
                    notificationsReceivedOldUserNotification.setTargetUser(null);
                    notificationsReceivedOldUserNotification = em.merge(notificationsReceivedOldUserNotification);
                }
            }
            for (UserNotification notificationsReceivedNewUserNotification : notificationsReceivedNew) {
                if (!notificationsReceivedOld.contains(notificationsReceivedNewUserNotification)) {
                    Usuario oldTargetUserOfNotificationsReceivedNewUserNotification = notificationsReceivedNewUserNotification.getTargetUser();
                    notificationsReceivedNewUserNotification.setTargetUser(usuario);
                    notificationsReceivedNewUserNotification = em.merge(notificationsReceivedNewUserNotification);
                    if (oldTargetUserOfNotificationsReceivedNewUserNotification != null && !oldTargetUserOfNotificationsReceivedNewUserNotification.equals(usuario)) {
                        oldTargetUserOfNotificationsReceivedNewUserNotification.getNotificationsReceived().remove(notificationsReceivedNewUserNotification);
                        oldTargetUserOfNotificationsReceivedNewUserNotification = em.merge(oldTargetUserOfNotificationsReceivedNewUserNotification);
                    }
                }
            }
            for (Reservation reservationsOldReservation : reservationsOld) {
                if (!reservationsNew.contains(reservationsOldReservation)) {
                    reservationsOldReservation.setReservedBy(null);
                    reservationsOldReservation = em.merge(reservationsOldReservation);
                }
            }
            for (Reservation reservationsNewReservation : reservationsNew) {
                if (!reservationsOld.contains(reservationsNewReservation)) {
                    Usuario oldReservedByOfReservationsNewReservation = reservationsNewReservation.getReservedBy();
                    reservationsNewReservation.setReservedBy(usuario);
                    reservationsNewReservation = em.merge(reservationsNewReservation);
                    if (oldReservedByOfReservationsNewReservation != null && !oldReservedByOfReservationsNewReservation.equals(usuario)) {
                        oldReservedByOfReservationsNewReservation.getReservations().remove(reservationsNewReservation);
                        oldReservedByOfReservationsNewReservation = em.merge(oldReservedByOfReservationsNewReservation);
                    }
                }
            }
            for (Space spacesListedOldSpace : spacesListedOld) {
                if (!spacesListedNew.contains(spacesListedOldSpace)) {
                    spacesListedOldSpace.setCreatedBy(null);
                    spacesListedOldSpace = em.merge(spacesListedOldSpace);
                }
            }
            for (Space spacesListedNewSpace : spacesListedNew) {
                if (!spacesListedOld.contains(spacesListedNewSpace)) {
                    Usuario oldCreatedByOfSpacesListedNewSpace = spacesListedNewSpace.getCreatedBy();
                    spacesListedNewSpace.setCreatedBy(usuario);
                    spacesListedNewSpace = em.merge(spacesListedNewSpace);
                    if (oldCreatedByOfSpacesListedNewSpace != null && !oldCreatedByOfSpacesListedNewSpace.equals(usuario)) {
                        oldCreatedByOfSpacesListedNewSpace.getSpacesListed().remove(spacesListedNewSpace);
                        oldCreatedByOfSpacesListedNewSpace = em.merge(oldCreatedByOfSpacesListedNewSpace);
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
                Long id = usuario.getSystemId();
                if (findUsuario(id) == null) {
                    throw new NonexistentEntityException("The usuario with id " + id + " no longer exists.");
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
            Usuario usuario;
            try {
                usuario = em.getReference(Usuario.class, id);
                usuario.getSystemId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The usuario with id " + id + " no longer exists.", enfe);
            }
            Organization organization = usuario.getOrganization();
            if (organization != null) {
                organization.getUsers().remove(usuario);
                organization = em.merge(organization);
            }
            Collection<SpaceReview> spaceReviews = usuario.getSpaceReviews();
            for (SpaceReview spaceReviewsSpaceReview : spaceReviews) {
                spaceReviewsSpaceReview.setReviewedBy(null);
                spaceReviewsSpaceReview = em.merge(spaceReviewsSpaceReview);
            }
            Collection<Venue> venuesListed = usuario.getVenuesListed();
            for (Venue venuesListedVenue : venuesListed) {
                venuesListedVenue.setCreatedBy(null);
                venuesListedVenue = em.merge(venuesListedVenue);
            }
            Collection<UserNotification> notificationsReceived = usuario.getNotificationsReceived();
            for (UserNotification notificationsReceivedUserNotification : notificationsReceived) {
                notificationsReceivedUserNotification.setTargetUser(null);
                notificationsReceivedUserNotification = em.merge(notificationsReceivedUserNotification);
            }
            Collection<Reservation> reservations = usuario.getReservations();
            for (Reservation reservationsReservation : reservations) {
                reservationsReservation.setReservedBy(null);
                reservationsReservation = em.merge(reservationsReservation);
            }
            Collection<Space> spacesListed = usuario.getSpacesListed();
            for (Space spacesListedSpace : spacesListed) {
                spacesListedSpace.setCreatedBy(null);
                spacesListedSpace = em.merge(spacesListedSpace);
            }
            em.remove(usuario);
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

    public List<Usuario> findUsuarioEntities() {
        return findUsuarioEntities(true, -1, -1);
    }

    public List<Usuario> findUsuarioEntities(int maxResults, int firstResult) {
        return findUsuarioEntities(false, maxResults, firstResult);
    }

    private List<Usuario> findUsuarioEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Usuario.class));
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

    public Usuario findUsuario(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Usuario.class, id);
        } finally {
            em.close();
        }
    }

    public int getUsuarioCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Usuario> rt = cq.from(Usuario.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
