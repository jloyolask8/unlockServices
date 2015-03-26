package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class ActivityLog implements Serializable {

    @Basic
    private String spaceId;
    @Basic
    private String description;
    @Basic
    private String userId;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idLog;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date creationDateTime;
    @Basic
    private String status;

    public ActivityLog() {

    }
   
    public String getSpaceId() {
        return this.spaceId;
    }

    public void setSpaceId(String spaceId) {
        this.spaceId = spaceId;
    }
   
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
   
    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
   
    public Long getIdLog() {
        return this.idLog;
    }

    public void setIdLog(Long idLog) {
        this.idLog = idLog;
    }
   
    public Date getCreationDateTime() {
        return this.creationDateTime;
    }

    public void setCreationDateTime(Date creationDateTime) {
        this.creationDateTime = creationDateTime;
    }
   
    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
