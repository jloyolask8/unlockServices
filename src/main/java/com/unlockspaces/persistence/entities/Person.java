package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.ElementCollection;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class Person implements Serializable {

    @Basic
    private String country;
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long systemId;
    @ElementCollection
    private Collection<Address> addresses;
    @Basic
    private String identification;
    @Basic
    private String name;
    @Basic
    private String genre;
    @Temporal(TemporalType.DATE)
    @Basic
    private Date bornDate;
    @ElementCollection
    private Collection<String> phoneNumbers;
    @Basic
    private String lastname;
    @Basic
    private String selfDescription;
    
    @Basic
    private String picture;
    @Basic
    private String locale;

    public Person() {

    }
   
    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
   
    public Long getSystemId() {
        return this.systemId;
    }

    public void setSystemId(Long systemId) {
        this.systemId = systemId;
    }
   
    public Collection<Address> getAddresses() {
        return this.addresses;
    }

    public void setAddresses(Collection<Address> addresses) {
        this.addresses = addresses;
    }
   
    public String getIdentification() {
        return this.identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }
   
    public Date getBornDate() {
        return this.bornDate;
    }

    public void setBornDate(Date bornDate) {
        this.bornDate = bornDate;
    }
   
    public Collection<String> getPhoneNumbers() {
        return this.phoneNumbers;
    }

    public void setPhoneNumbers(Collection<String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }
   
    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
   
    public String getSelfDescription() {
        return this.selfDescription;
    }

    public void setSelfDescription(String selfDescription) {
        this.selfDescription = selfDescription;
    }

    /**
     * @return the picture
     */
    public String getPicture() {
        return picture;
    }

    /**
     * @param picture the picture to set
     */
    public void setPicture(String picture) {
        this.picture = picture;
    }

    /**
     * @return the locale
     */
    public String getLocale() {
        return locale;
    }

    /**
     * @param locale the locale to set
     */
    public void setLocale(String locale) {
        this.locale = locale;
    }
}
