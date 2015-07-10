package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@XmlRootElement

@NamedQueries({
    @NamedQuery(name = "Usuario.findAll", query = "SELECT o FROM Usuario o"),
    @NamedQuery(name = "Usuario.findByUserId", query = "SELECT u FROM Usuario u WHERE u.userId = :userId"),
    @NamedQuery(name = "Usuario.findByEmail", query = "SELECT u FROM Usuario u WHERE u.email = :email")})

public class Usuario extends Person implements Serializable {

    //user_id
    @Basic
    private String userId;

    @OneToMany(targetEntity = SpaceReview.class, mappedBy = "reviewedBy")
    private Collection<SpaceReview> spaceReviews;
    @Basic
    private String password;
    @OneToMany(targetEntity = Venue.class, mappedBy = "createdBy")
    private Collection<Venue> venuesListed;
    @OneToMany(targetEntity = UserNotification.class, mappedBy = "targetUser")
    private Collection<UserNotification> notificationsReceived;
    @OneToMany(targetEntity = Reservation.class, mappedBy = "reservedBy")
    private Collection<Reservation> reservations;
    @ManyToOne(targetEntity = Organization.class)
    private Organization organization;

    @Basic
    private String creationDate;
    @Basic
    private String lastModifDate;
    @OneToMany(targetEntity = Space.class, mappedBy = "createdBy")
    private Collection<Space> spacesListed;
    @Basic
    private String email;

    @Basic
    @Column(name = "email_verified")
    private boolean emailVerified;

    @Basic
    private String username;

    @ElementCollection(fetch = FetchType.EAGER)
    private Collection<Identity> identities;

    @Transient
    private Integer spacesQty;

    @Transient
    private Integer venuesQty;

    public Usuario() {

    }

    @XmlTransient
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

    public int getVenuesQty() {
        return this.venuesListed != null ? this.venuesListed.size() : 0;
    }

    public void setVenuesQty() {
    }

    public void setSpacesQty() {
    }

    public int getSpacesQty() {
        int qty = 0;
        for (Venue venuesListed1 : this.venuesListed) {
            qty = qty + (venuesListed1.getSpaces() != null ? venuesListed1.getSpaces().size() : 0);
        }
        return this.venuesListed != null ? this.venuesListed.size() : 0;
    }

    @XmlTransient
    public Collection<Venue> getVenuesListed() {
        return this.venuesListed;
    }

    public void setVenuesListed(Collection<Venue> venuesListed) {
        this.venuesListed = venuesListed;
    }

    @XmlTransient
    public Collection<UserNotification> getNotificationsReceived() {
        return this.notificationsReceived;
    }

    public void setNotificationsReceived(Collection<UserNotification> notificationsReceived) {
        this.notificationsReceived = notificationsReceived;
    }

    @XmlTransient
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

    @XmlTransient
    public Collection<Space> getSpacesListed() {
        return this.spacesListed;
    }

    public void setSpacesListed(Collection<Space> spacesListed) {
        this.spacesListed = spacesListed;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the userId
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * @return the emailVerified
     */
    public boolean isEmailVerified() {
        return emailVerified;
    }

    /**
     * @param emailVerified the emailVerified to set
     */
    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    /**
     * @return the identities
     */
    public Collection<Identity> getIdentities() {
        return identities;
    }

    /**
     * @param identities the identities to set
     */
    public void setIdentities(Collection<Identity> identities) {
        this.identities = identities;
    }

    @Override
    public String toString() {
        return "Usuario{" + "userId=" + userId + ", email=" + email + '}';
    }
    
    
}
