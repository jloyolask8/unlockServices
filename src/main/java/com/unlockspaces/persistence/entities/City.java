package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class City implements Serializable {

    @ManyToOne(targetEntity = Country.class)
    private Country country;
    @Basic
    private String name;
    @Id
    private String id_code;

    public City() {

    }
   
    public Country getCountry() {
        return this.country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public String getId_code() {
        return this.id_code;
    }

    public void setId_code(String id_code) {
        this.id_code = id_code;
    }
}
