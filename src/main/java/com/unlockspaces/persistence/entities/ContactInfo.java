package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class ContactInfo implements Serializable {

    @Basic
    private String whatsapp;
    @Basic
    private String skype;
    @Basic
    private String website;
    @Basic
    private String phone;
    @Basic
    private String name;
    @Basic
    private String email;

    public ContactInfo() {

    }
   
    public String getWhatsapp() {
        return this.whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }
   
    public String getSkype() {
        return this.skype;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }
   
    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
   
    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
   
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
   
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
