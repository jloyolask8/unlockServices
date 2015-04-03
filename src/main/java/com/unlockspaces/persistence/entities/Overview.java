package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class Overview implements Serializable {

    @Basic
    private String summary;
    @Basic
    private String title;

    public Overview() {

    }
   
    public String getSummary() {
        return this.summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
   
    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
    public String toString(){
        return this.title;
    }
}
