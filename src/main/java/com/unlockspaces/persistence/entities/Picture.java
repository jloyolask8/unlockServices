package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Picture implements Serializable {

    @Basic
    private String cloudinaryUrl2;
    @Basic
    private String cloudinaryUrl1;
    @Basic
    private String filename;
    @Basic
    private String cloudinaryUrl3;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Basic
    private String mimeType;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date creationDate;
    @OneToOne(targetEntity = Usuario.class)
    private Usuario uploadedBy;
    @ManyToOne(targetEntity = Space.class)
    private Space space;

    public Picture() {

    }
   
    public String getCloudinaryUrl2() {
        return this.cloudinaryUrl2;
    }

    public void setCloudinaryUrl2(String cloudinaryUrl2) {
        this.cloudinaryUrl2 = cloudinaryUrl2;
    }
   
    public String getCloudinaryUrl1() {
        return this.cloudinaryUrl1;
    }

    public void setCloudinaryUrl1(String cloudinaryUrl1) {
        this.cloudinaryUrl1 = cloudinaryUrl1;
    }
   
    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
   
    public String getCloudinaryUrl3() {
        return this.cloudinaryUrl3;
    }

    public void setCloudinaryUrl3(String cloudinaryUrl3) {
        this.cloudinaryUrl3 = cloudinaryUrl3;
    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
   
    public String getMimeType() {
        return this.mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
   
    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
   
    public Usuario getUploadedBy() {
        return this.uploadedBy;
    }

    public void setUploadedBy(Usuario uploadedBy) {
        this.uploadedBy = uploadedBy;
    }
   
    public Space getSpace() {
        return this.space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }
}
