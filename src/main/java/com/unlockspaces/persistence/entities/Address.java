package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;
import javax.persistence.OneToOne;

@Embeddable
public class Address implements Serializable {

    @OneToOne(targetEntity = Country.class)
    private Country country;
    @Basic
    private String addressOnMap;
    @OneToOne(targetEntity = City.class)
    private City city;
    @Basic
    private String postalCode;
    @Basic
    private String latitude;
    @Basic
    private String region;
    @Basic
    private String line2;
    @Basic
    private String line1;
    @Basic
    private String longitude;

    public Address() {

    }
   
    public Country getCountry() {
        return this.country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
   
    public String getAddressOnMap() {
        return this.addressOnMap;
    }

    public void setAddressOnMap(String addressOnMap) {
        this.addressOnMap = addressOnMap;
    }
   
    public City getCity() {
        return this.city;
    }

    public void setCity(City city) {
        this.city = city;
    }
   
    public String getPostalCode() {
        return this.postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
   
    public String getLatitude() {
        return this.latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }
   
    public String getRegion() {
        return this.region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
   
    public String getLine2() {
        return this.line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }
   
    public String getLine1() {
        return this.line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }
   
    public String getLongitude() {
        return this.longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }
}
