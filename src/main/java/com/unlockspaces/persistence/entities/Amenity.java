package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Amenity implements Serializable {

    @Basic
    private String name;
    @ManyToMany(targetEntity = Space.class,mappedBy = "amenitiesAvailable")
    private Collection<Space> spaces;
    @Basic
    private String details;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    public Amenity() {

    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public Collection<Space> getSpaces() {
        return this.spaces;
    }

    public void setSpaces(Collection<Space> spaces) {
        this.spaces = spaces;
    }
   
    public String getDetails() {
        return this.details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
   
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
