package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.eclipse.persistence.oxm.annotations.XmlInverseReference;

@Entity
public class SpaceReview implements Serializable {

    @Basic
    private int rating;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Basic
    private String text;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date creationDate;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date lastModifDate;
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario reviewedBy;
    @XmlInverseReference(mappedBy = "reviews")
    @ManyToOne(targetEntity = Space.class)
    private Space space;

    public SpaceReview() {

    }
   
    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
   
    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }
   
    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
   
    public Date getLastModifDate() {
        return this.lastModifDate;
    }

    public void setLastModifDate(Date lastModifDate) {
        this.lastModifDate = lastModifDate;
    }
   
    public Usuario getReviewedBy() {
        return this.reviewedBy;
    }

    public void setReviewedBy(Usuario reviewedBy) {
        this.reviewedBy = reviewedBy;
    }
   
    public Space getSpace() {
        return this.space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }
}
