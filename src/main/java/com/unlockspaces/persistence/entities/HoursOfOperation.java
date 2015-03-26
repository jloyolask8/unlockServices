package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class HoursOfOperation implements Serializable {

    @Embedded
    private Availabilityy sunday;
    @Embedded
    private Availabilityy saturday;
    @Embedded
    private Availabilityy tuesday;
    @Embedded
    private Availabilityy wednesday;
    @Embedded
    private Availabilityy thursday;
    @Embedded
    private Availabilityy friday;
    @Embedded
    private Availabilityy monday;

    public HoursOfOperation() {

    }
   
    public Availabilityy getSunday() {
        return this.sunday;
    }

    public void setSunday(Availabilityy sunday) {
        this.sunday = sunday;
    }
   
    public Availabilityy getSaturday() {
        return this.saturday;
    }

    public void setSaturday(Availabilityy saturday) {
        this.saturday = saturday;
    }
   
    public Availabilityy getTuesday() {
        return this.tuesday;
    }

    public void setTuesday(Availabilityy tuesday) {
        this.tuesday = tuesday;
    }
   
    public Availabilityy getWednesday() {
        return this.wednesday;
    }

    public void setWednesday(Availabilityy wednesday) {
        this.wednesday = wednesday;
    }
   
    public Availabilityy getThursday() {
        return this.thursday;
    }

    public void setThursday(Availabilityy thursday) {
        this.thursday = thursday;
    }
   
    public Availabilityy getFriday() {
        return this.friday;
    }

    public void setFriday(Availabilityy friday) {
        this.friday = friday;
    }
   
    public Availabilityy getMonday() {
        return this.monday;
    }

    public void setMonday(Availabilityy monday) {
        this.monday = monday;
    }
}
