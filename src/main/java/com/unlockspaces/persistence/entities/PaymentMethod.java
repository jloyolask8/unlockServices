package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class PaymentMethod implements Serializable {

    @Basic
    private String longDescription;
    @Id
    private String id;
    @Basic
    private String shortDescription;

    public PaymentMethod() {

    }
   
    public String getLongDescription() {
        return this.longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }
   
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
   
    public String getShortDescription() {
        return this.shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }
}
