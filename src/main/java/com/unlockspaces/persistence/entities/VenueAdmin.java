package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class VenueAdmin implements Serializable {

    @Basic
    private String adminName;
    @Basic
    private String adminEmail;
    @Basic
    private String adminRole;

    public VenueAdmin() {
    }

    /**
     * @return the adminName
     */
    public String getAdminName() {
        return adminName;
    }

    /**
     * @param adminName the adminName to set
     */
    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    /**
     * @return the adminEmail
     */
    public String getAdminEmail() {
        return adminEmail;
    }

    /**
     * @param adminEmail the adminEmail to set
     */
    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    /**
     * @return the adminRole
     */
    public String getAdminRole() {
        return adminRole;
    }

    /**
     * @param adminRole the adminRole to set
     */
    public void setAdminRole(String adminRole) {
        this.adminRole = adminRole;
    }

}
