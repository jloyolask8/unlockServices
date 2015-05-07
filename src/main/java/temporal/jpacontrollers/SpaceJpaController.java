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
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Picture;
import java.util.ArrayList;
import java.util.Collection;
import com.unlockspaces.persistence.entities.SpaceReview;
import com.unlockspaces.persistence.entities.Amenity;
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
public class SpaceJpaController implements Serializable {

    public SpaceJpaController(UserTransaction utx, EntityManagerFactory emf) {
        this.utx = utx;
        this.emf = emf;
    }
    private UserTransaction utx = null;
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public void create(Space space) throws RollbackFailureException, Exception {
        if (space.getPhotos() == null) {
            space.setPhotos(new ArrayList<Picture>());
        }
        if (space.getReviews() == null) {
            space.setReviews(new ArrayList<SpaceReview>());
        }
        if (space.getAmenitiesAvailable() == null) {
            space.setAmenitiesAvailable(new ArrayList<Amenity>());
        }
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Venue venue = space.getVenue();
            if (venue != null) {
                venue = em.getReference(venue.getClass(), venue.getId());
                space.setVenue(venue);
            }
            Usuario createdBy = space.getCreatedBy();
            if (createdBy != null) {
                createdBy = em.getReference(createdBy.getClass(), createdBy.getSystemId());
                space.setCreatedBy(createdBy);
            }
            Picture frontPhoto = space.getFrontPhoto();
            if (frontPhoto != null) {
                frontPhoto = em.getReference(frontPhoto.getClass(), frontPhoto.getId());
                space.setFrontPhoto(frontPhoto);
            }
            Collection<Picture> attachedPhotos = new ArrayList<Picture>();
            for (Picture photosPictureToAttach : space.getPhotos()) {
                photosPictureToAttach = em.getReference(photosPictureToAttach.getClass(), photosPictureToAttach.getId());
                attachedPhotos.add(photosPictureToAttach);
            }
            space.setPhotos(attachedPhotos);
            Collection<SpaceReview> attachedReviews = new ArrayList<SpaceReview>();
            for (SpaceReview reviewsSpaceReviewToAttach : space.getReviews()) {
                reviewsSpaceReviewToAttach = em.getReference(reviewsSpaceReviewToAttach.getClass(), reviewsSpaceReviewToAttach.getId());
                attachedReviews.add(reviewsSpaceReviewToAttach);
            }
            space.setReviews(attachedReviews);
            Collection<Amenity> attachedAmenitiesAvailable = new ArrayList<Amenity>();
            for (Amenity amenitiesAvailableAmenityToAttach : space.getAmenitiesAvailable()) {
                amenitiesAvailableAmenityToAttach = em.getReference(amenitiesAvailableAmenityToAttach.getClass(), amenitiesAvailableAmenityToAttach.getId());
                attachedAmenitiesAvailable.add(amenitiesAvailableAmenityToAttach);
            }
            space.setAmenitiesAvailable(attachedAmenitiesAvailable);
            em.persist(space);
            if (venue != null) {
                venue.getSpaces().add(space);
                venue = em.merge(venue);
            }
            if (createdBy != null) {
                createdBy.getSpacesListed().add(space);
                createdBy = em.merge(createdBy);
            }
            if (frontPhoto != null) {
                Space oldSpaceOfFrontPhoto = frontPhoto.getSpace();
                if (oldSpaceOfFrontPhoto != null) {
                    oldSpaceOfFrontPhoto.setFrontPhoto(null);
                    oldSpaceOfFrontPhoto = em.merge(oldSpaceOfFrontPhoto);
                }
                frontPhoto.setSpace(space);
                frontPhoto = em.merge(frontPhoto);
            }
            for (Picture photosPicture : space.getPhotos()) {
                Space oldSpaceOfPhotosPicture = photosPicture.getSpace();
                photosPicture.setSpace(space);
                photosPicture = em.merge(photosPicture);
                if (oldSpaceOfPhotosPicture != null) {
                    oldSpaceOfPhotosPicture.getPhotos().remove(photosPicture);
                    oldSpaceOfPhotosPicture = em.merge(oldSpaceOfPhotosPicture);
                }
            }
            for (SpaceReview reviewsSpaceReview : space.getReviews()) {
                Space oldSpaceOfReviewsSpaceReview = reviewsSpaceReview.getSpace();
                reviewsSpaceReview.setSpace(space);
                reviewsSpaceReview = em.merge(reviewsSpaceReview);
                if (oldSpaceOfReviewsSpaceReview != null) {
                    oldSpaceOfReviewsSpaceReview.getReviews().remove(reviewsSpaceReview);
                    oldSpaceOfReviewsSpaceReview = em.merge(oldSpaceOfReviewsSpaceReview);
                }
            }
            for (Amenity amenitiesAvailableAmenity : space.getAmenitiesAvailable()) {
                amenitiesAvailableAmenity.getSpaces().add(space);
                amenitiesAvailableAmenity = em.merge(amenitiesAvailableAmenity);
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

    public void edit(Space space) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
            utx.begin();
            em = getEntityManager();
            Space persistentSpace = em.find(Space.class, space.getId());
            Venue venueOld = persistentSpace.getVenue();
            Venue venueNew = space.getVenue();
            Usuario createdByOld = persistentSpace.getCreatedBy();
            Usuario createdByNew = space.getCreatedBy();
            Picture frontPhotoOld = persistentSpace.getFrontPhoto();
            Picture frontPhotoNew = space.getFrontPhoto();
            Collection<Picture> photosOld = persistentSpace.getPhotos();
            Collection<Picture> photosNew = space.getPhotos();
            Collection<SpaceReview> reviewsOld = persistentSpace.getReviews();
            Collection<SpaceReview> reviewsNew = space.getReviews();
            Collection<Amenity> amenitiesAvailableOld = persistentSpace.getAmenitiesAvailable();
            Collection<Amenity> amenitiesAvailableNew = space.getAmenitiesAvailable();
            if (venueNew != null) {
                venueNew = em.getReference(venueNew.getClass(), venueNew.getId());
                space.setVenue(venueNew);
            }
            if (createdByNew != null) {
                createdByNew = em.getReference(createdByNew.getClass(), createdByNew.getSystemId());
                space.setCreatedBy(createdByNew);
            }
            if (frontPhotoNew != null) {
                frontPhotoNew = em.getReference(frontPhotoNew.getClass(), frontPhotoNew.getId());
                space.setFrontPhoto(frontPhotoNew);
            }
            Collection<Picture> attachedPhotosNew = new ArrayList<Picture>();
            for (Picture photosNewPictureToAttach : photosNew) {
                photosNewPictureToAttach = em.getReference(photosNewPictureToAttach.getClass(), photosNewPictureToAttach.getId());
                attachedPhotosNew.add(photosNewPictureToAttach);
            }
            photosNew = attachedPhotosNew;
            space.setPhotos(photosNew);
            Collection<SpaceReview> attachedReviewsNew = new ArrayList<SpaceReview>();
            for (SpaceReview reviewsNewSpaceReviewToAttach : reviewsNew) {
                reviewsNewSpaceReviewToAttach = em.getReference(reviewsNewSpaceReviewToAttach.getClass(), reviewsNewSpaceReviewToAttach.getId());
                attachedReviewsNew.add(reviewsNewSpaceReviewToAttach);
            }
            reviewsNew = attachedReviewsNew;
            space.setReviews(reviewsNew);
            Collection<Amenity> attachedAmenitiesAvailableNew = new ArrayList<Amenity>();
            for (Amenity amenitiesAvailableNewAmenityToAttach : amenitiesAvailableNew) {
                amenitiesAvailableNewAmenityToAttach = em.getReference(amenitiesAvailableNewAmenityToAttach.getClass(), amenitiesAvailableNewAmenityToAttach.getId());
                attachedAmenitiesAvailableNew.add(amenitiesAvailableNewAmenityToAttach);
            }
            amenitiesAvailableNew = attachedAmenitiesAvailableNew;
            space.setAmenitiesAvailable(amenitiesAvailableNew);
            space = em.merge(space);
            if (venueOld != null && !venueOld.equals(venueNew)) {
                venueOld.getSpaces().remove(space);
                venueOld = em.merge(venueOld);
            }
            if (venueNew != null && !venueNew.equals(venueOld)) {
                venueNew.getSpaces().add(space);
                venueNew = em.merge(venueNew);
            }
            if (createdByOld != null && !createdByOld.equals(createdByNew)) {
                createdByOld.getSpacesListed().remove(space);
                createdByOld = em.merge(createdByOld);
            }
            if (createdByNew != null && !createdByNew.equals(createdByOld)) {
                createdByNew.getSpacesListed().add(space);
                createdByNew = em.merge(createdByNew);
            }
            if (frontPhotoOld != null && !frontPhotoOld.equals(frontPhotoNew)) {
                frontPhotoOld.setSpace(null);
                frontPhotoOld = em.merge(frontPhotoOld);
            }
            if (frontPhotoNew != null && !frontPhotoNew.equals(frontPhotoOld)) {
                Space oldSpaceOfFrontPhoto = frontPhotoNew.getSpace();
                if (oldSpaceOfFrontPhoto != null) {
                    oldSpaceOfFrontPhoto.setFrontPhoto(null);
                    oldSpaceOfFrontPhoto = em.merge(oldSpaceOfFrontPhoto);
                }
                frontPhotoNew.setSpace(space);
                frontPhotoNew = em.merge(frontPhotoNew);
            }
            for (Picture photosOldPicture : photosOld) {
                if (!photosNew.contains(photosOldPicture)) {
                    photosOldPicture.setSpace(null);
                    photosOldPicture = em.merge(photosOldPicture);
                }
            }
            for (Picture photosNewPicture : photosNew) {
                if (!photosOld.contains(photosNewPicture)) {
                    Space oldSpaceOfPhotosNewPicture = photosNewPicture.getSpace();
                    photosNewPicture.setSpace(space);
                    photosNewPicture = em.merge(photosNewPicture);
                    if (oldSpaceOfPhotosNewPicture != null && !oldSpaceOfPhotosNewPicture.equals(space)) {
                        oldSpaceOfPhotosNewPicture.getPhotos().remove(photosNewPicture);
                        oldSpaceOfPhotosNewPicture = em.merge(oldSpaceOfPhotosNewPicture);
                    }
                }
            }
            for (SpaceReview reviewsOldSpaceReview : reviewsOld) {
                if (!reviewsNew.contains(reviewsOldSpaceReview)) {
                    reviewsOldSpaceReview.setSpace(null);
                    reviewsOldSpaceReview = em.merge(reviewsOldSpaceReview);
                }
            }
            for (SpaceReview reviewsNewSpaceReview : reviewsNew) {
                if (!reviewsOld.contains(reviewsNewSpaceReview)) {
                    Space oldSpaceOfReviewsNewSpaceReview = reviewsNewSpaceReview.getSpace();
                    reviewsNewSpaceReview.setSpace(space);
                    reviewsNewSpaceReview = em.merge(reviewsNewSpaceReview);
                    if (oldSpaceOfReviewsNewSpaceReview != null && !oldSpaceOfReviewsNewSpaceReview.equals(space)) {
                        oldSpaceOfReviewsNewSpaceReview.getReviews().remove(reviewsNewSpaceReview);
                        oldSpaceOfReviewsNewSpaceReview = em.merge(oldSpaceOfReviewsNewSpaceReview);
                    }
                }
            }
            for (Amenity amenitiesAvailableOldAmenity : amenitiesAvailableOld) {
                if (!amenitiesAvailableNew.contains(amenitiesAvailableOldAmenity)) {
                    amenitiesAvailableOldAmenity.getSpaces().remove(space);
                    amenitiesAvailableOldAmenity = em.merge(amenitiesAvailableOldAmenity);
                }
            }
            for (Amenity amenitiesAvailableNewAmenity : amenitiesAvailableNew) {
                if (!amenitiesAvailableOld.contains(amenitiesAvailableNewAmenity)) {
                    amenitiesAvailableNewAmenity.getSpaces().add(space);
                    amenitiesAvailableNewAmenity = em.merge(amenitiesAvailableNewAmenity);
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
                Long id = space.getId();
                if (findSpace(id) == null) {
                    throw new NonexistentEntityException("The space with id " + id + " no longer exists.");
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
            Space space;
            try {
                space = em.getReference(Space.class, id);
                space.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The space with id " + id + " no longer exists.", enfe);
            }
            Venue venue = space.getVenue();
            if (venue != null) {
                venue.getSpaces().remove(space);
                venue = em.merge(venue);
            }
            Usuario createdBy = space.getCreatedBy();
            if (createdBy != null) {
                createdBy.getSpacesListed().remove(space);
                createdBy = em.merge(createdBy);
            }
            Picture frontPhoto = space.getFrontPhoto();
            if (frontPhoto != null) {
                frontPhoto.setSpace(null);
                frontPhoto = em.merge(frontPhoto);
            }
            Collection<Picture> photos = space.getPhotos();
            for (Picture photosPicture : photos) {
                photosPicture.setSpace(null);
                photosPicture = em.merge(photosPicture);
            }
            Collection<SpaceReview> reviews = space.getReviews();
            for (SpaceReview reviewsSpaceReview : reviews) {
                reviewsSpaceReview.setSpace(null);
                reviewsSpaceReview = em.merge(reviewsSpaceReview);
            }
            Collection<Amenity> amenitiesAvailable = space.getAmenitiesAvailable();
            for (Amenity amenitiesAvailableAmenity : amenitiesAvailable) {
                amenitiesAvailableAmenity.getSpaces().remove(space);
                amenitiesAvailableAmenity = em.merge(amenitiesAvailableAmenity);
            }
            em.remove(space);
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

    public List<Space> findSpaceEntities() {
        return findSpaceEntities(true, -1, -1);
    }

    public List<Space> findSpaceEntities(int maxResults, int firstResult) {
        return findSpaceEntities(false, maxResults, firstResult);
    }

    private List<Space> findSpaceEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Space.class));
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

    public Space findSpace(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Space.class, id);
        } finally {
            em.close();
        }
    }

    public int getSpaceCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Space> rt = cq.from(Space.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
