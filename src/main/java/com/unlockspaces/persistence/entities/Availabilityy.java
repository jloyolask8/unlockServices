package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class Availabilityy implements Serializable {

    @Basic
    private String availabilityOption;
    @Basic
    private String startTime;
    @Basic
    private String endTime;

    public Availabilityy() {

    }
   
    public String getAvailabilityOption() {
        return this.availabilityOption;
    }

    public void setAvailabilityOption(String availabilityOption) {
        this.availabilityOption = availabilityOption;
    }
   
    public String getStartTime() {
        return this.startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
   
    public String getEndTime() {
        return this.endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
