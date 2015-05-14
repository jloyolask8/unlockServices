package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

@Entity
@XmlRootElement
public class Space implements Serializable {

    @Embedded
    private Overview overview;
    @ManyToOne(targetEntity = Venue.class)
    
    private Venue venue;
    
    @OneToOne(targetEntity = CancelationPolicy.class)
    private CancelationPolicy cancelationPolicy;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date creationDate;
    
    @OneToOne(targetEntity = SpaceType.class, cascade = CascadeType.MERGE)
    private SpaceType type;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private Collection<String> photos;
    
    @Basic
    private int capacity;
    
    @OneToOne(targetEntity = SpaceStatus.class)
    private SpaceStatus spaceStatus;
    @OneToMany(targetEntity = SpaceReview.class,mappedBy = "space")
    private Collection<SpaceReview> reviews;
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario createdBy;
    @OneToOne(targetEntity = ReservationMethod.class)
    private ReservationMethod reservationMethod;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date lastModifDate;
    @OneToOne(targetEntity = SpaceCategory.class)
    private SpaceCategory category;
    @Embedded
    private Pricing pricing;
   
    @Basic
    private String frontPhoto;

    public Space() {
        this.overview = new Overview();
        this.pricing = new Pricing();
    }
   
    public Overview getOverview() {
        return this.overview;
    }

    public void setOverview(Overview overview) {
        this.overview = overview;
    }
   
    @XmlInverseReference(mappedBy = "spaces")
    public Venue getVenue() {
        return this.venue;
    }

    
    public void setVenue(Venue venue) {
        this.venue = venue;
    }
   
    public CancelationPolicy getCancelationPolicy() {
        return this.cancelationPolicy;
    }

    public void setCancelationPolicy(CancelationPolicy cancelationPolicy) {
        this.cancelationPolicy = cancelationPolicy;
    }
   
    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
   
    public SpaceType getType() {
        return this.type;
    }

    public void setType(SpaceType type) {
        this.type = type;
    }
   
    
    public Collection<String> getPhotos() {
        return this.photos;
    }

    public void setPhotos(Collection<String> photos) {
        this.photos = photos;
    }
   
    public int getCapacity() {
        return this.capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
   
    public SpaceStatus getSpaceStatus() {
        return this.spaceStatus;
    }

    public void setSpaceStatus(SpaceStatus spaceStatus) {
        this.spaceStatus = spaceStatus;
    }
   
    public Collection<SpaceReview> getReviews() {
        return this.reviews;
    }

    public void setReviews(Collection<SpaceReview> reviews) {
        this.reviews = reviews;
    }
   
    public Usuario getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Usuario createdBy) {
        this.createdBy = createdBy;
    }
   
    public ReservationMethod getReservationMethod() {
        return this.reservationMethod;
    }

    public void setReservationMethod(ReservationMethod reservationMethod) {
        this.reservationMethod = reservationMethod;
    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
   
    public Date getLastModifDate() {
        return this.lastModifDate;
    }

    public void setLastModifDate(Date lastModifDate) {
        this.lastModifDate = lastModifDate;
    }
   
    public SpaceCategory getCategory() {
        return this.category;
    }

    public void setCategory(SpaceCategory category) {
        this.category = category;
    }
   
    public Pricing getPricing() {
        return this.pricing;
    }

    public void setPricing(Pricing pricing) {
        this.pricing = pricing;
    }
   
  
   
    public String getFrontPhoto() {
        return this.frontPhoto;
    }

    public void setFrontPhoto(String frontPhoto) {
        this.frontPhoto = frontPhoto;
    }
}
