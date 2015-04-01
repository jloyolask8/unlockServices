package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class IdentityVerificationType implements Serializable {

    @Basic
    private String name;
    @Basic
    private String description;
    @Id
    private String id;
    @Basic
    private String webIcon;

    public IdentityVerificationType() {

    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
   
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
   
    public String getWebIcon() {
        return this.webIcon;
    }

    public void setWebIcon(String webIcon) {
        this.webIcon = webIcon;
    }
}
