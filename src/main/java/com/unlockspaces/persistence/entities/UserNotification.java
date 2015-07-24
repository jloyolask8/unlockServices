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
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class UserNotification implements Serializable {

     @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
     
    @Basic
    private boolean read;
    @Basic
    private String details;
    
//  colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];
    @Basic
    private String color;
   
    @Basic
    private String title;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date creationDate;
    @ManyToOne(targetEntity = Usuario.class)
    private Usuario targetUser;

    public UserNotification() {

    }
    
    public boolean isRead() {
        return this.read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
   
    public String getDetails() {
        return this.details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
   
    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
   
    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
   
    public Usuario getTargetUser() {
        return this.targetUser;
    }

    public void setTargetUser(Usuario targetUser) {
        this.targetUser = targetUser;
    }

    /**
     * @return the color
     */
    public String getColor() {
        return color;
    }

    /**
     * @param color the color to set
     */
    public void setColor(String color) {
        this.color = color;
    }
}
