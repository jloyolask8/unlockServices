package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
/**
 * "identities": [
    {
      "access_token": "ya29.lQGl-6e8I_WGEOBoI987UFhR3VEO-egvDRN-g0IKKA7oxKo6CUkDq9qP0901VdkRDEmDWMCUE7Uq3Q",
      "provider": "google-oauth2",
      "expires_in": 3600,
      "user_id": "109202765438194828936",
      "connection": "google-oauth2",
      "isSocial": true
    }
 * @author jonathan
 */
@Embeddable
public class Identity implements Serializable {

    @Basic
    private String provider;
    @Basic
    @Column(name = "is_social")
    private boolean isSocial;
    @Basic
    @Column(name = "access_token")
    private String accessToken;
    @Basic
    private String conection;
    @Basic
    private String userId;

    /**
     * @return the provider
     */
    public String getProvider() {
        return provider;
    }

    /**
     * @param provider the provider to set
     */
    public void setProvider(String provider) {
        this.provider = provider;
    }

    /**
     * @return the isSocial
     */
    public boolean isIsSocial() {
        return isSocial;
    }

    /**
     * @param isSocial the isSocial to set
     */
    public void setIsSocial(boolean isSocial) {
        this.isSocial = isSocial;
    }

    /**
     * @return the accessToken
     */
    public String getAccessToken() {
        return accessToken;
    }

    /**
     * @param accessToken the accessToken to set
     */
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    /**
     * @return the connection
     */
    public String getConnection() {
        return conection;
    }

    /**
     * @param connection the connection to set
     */
    public void setConnection(String connection) {
        this.conection = connection;
    }

    /**
     * @return the userId
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }
   
}
