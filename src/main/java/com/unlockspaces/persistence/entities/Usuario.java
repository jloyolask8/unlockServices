package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Usuario extends Person implements Serializable {

    @OneToMany(targetEntity = SpaceReview.class,mappedBy = "reviewedBy")
    private Collection<SpaceReview> spaceReviews;
    @Basic
    private String password;
    @OneToMany(targetEntity = Venue.class,mappedBy = "createdBy")
    private Collection<Venue> venuesListed;
    @OneToMany(targetEntity = UserNotification.class,mappedBy = "targetUser")
    private Collection<UserNotification> notificationsReceived;
    @OneToMany(targetEntity = Reservation.class,mappedBy = "reservedBy")
    private Collection<Reservation> reservations;
    @ManyToOne(targetEntity = Organization.class)
    private Organization organization;
    @Basic
    private String creationDate;
    @Basic
    private String lastModifDate;
    @OneToMany(targetEntity = Space.class,mappedBy = "createdBy")
    private Collection<Space> spacesListed;
    @Basic
    private String username;

    public Usuario() {

    }
   
    public Collection<SpaceReview> getSpaceReviews() {
        return this.spaceReviews;
    }

    public void setSpaceReviews(Collection<SpaceReview> spaceReviews) {
        this.spaceReviews = spaceReviews;
    }
   
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
   
    public Collection<Venue> getVenuesListed() {
        return this.venuesListed;
    }

    public void setVenuesListed(Collection<Venue> venuesListed) {
        this.venuesListed = venuesListed;
    }
   
    public Collection<UserNotification> getNotificationsReceived() {
        return this.notificationsReceived;
    }

    public void setNotificationsReceived(Collection<UserNotification> notificationsReceived) {
        this.notificationsReceived = notificationsReceived;
    }
   
    public Collection<Reservation> getReservations() {
        return this.reservations;
    }

    public void setReservations(Collection<Reservation> reservations) {
        this.reservations = reservations;
    }
   
    public Organization getOrganization() {
        return this.organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
   
    public String getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
   
    public String getLastModifDate() {
        return this.lastModifDate;
    }

    public void setLastModifDate(String lastModifDate) {
        this.lastModifDate = lastModifDate;
    }
   
    public Collection<Space> getSpacesListed() {
        return this.spacesListed;
    }

    public void setSpacesListed(Collection<Space> spacesListed) {
        this.spacesListed = spacesListed;
    }
   
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
