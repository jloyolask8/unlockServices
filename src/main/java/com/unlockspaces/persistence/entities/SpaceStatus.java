package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class SpaceStatus implements Serializable {

    public enum EnumSpaceStatus {

        PUBLISHED(new SpaceStatus("PUBLISHED", "PUBLISHED", "")),
        PENDING(new SpaceStatus("PENDING", "PENDING", "")), 
        REJECTED(new SpaceStatus("REJECTED", "REJECTED", ""));

        private SpaceStatus spaceStatus;

        EnumSpaceStatus(SpaceStatus s) {
            this.spaceStatus = s;
        }

        public SpaceStatus getSpaceStatus() {
            return spaceStatus;
        }
    }
    
    @Basic
    private String name;
    @Basic
    private String details;
    @Id
    private String id;

    public SpaceStatus() {

    }

    public SpaceStatus(String id, String name, String details) {
        this.name = name;
        this.details = details;
        this.id = id;
    }
    
    
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public String getDetails() {
        return this.details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
   
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "SpaceStatus{" + "name=" + name + '}';
    }
    
    
}
