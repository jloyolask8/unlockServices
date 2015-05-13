package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class Address implements Serializable {

//     @Basic
//    private String country;
    @Basic
    private String addressOnMap;
     @Basic
    private String city;
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
//        this.city = new City();
//        this.country = new Country();
    }
   
   
   
    public String getAddressOnMap() {
        return this.addressOnMap;
    }

    public void setAddressOnMap(String addressOnMap) {
        this.addressOnMap = addressOnMap;
    }
   
    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
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
