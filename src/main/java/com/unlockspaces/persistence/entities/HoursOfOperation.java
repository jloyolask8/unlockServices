package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class HoursOfOperation implements Serializable {

    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "sundayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "sundayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "sundayEndTime"))
    })
    @Embedded
    private Availabilityy sunday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "saturdayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "saturdayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "saturdayEndTime"))
    })
    @Embedded
    private Availabilityy saturday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "tuesdayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "tuesdayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "tuesdayEndTime"))
    })
    @Embedded
    private Availabilityy tuesday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "wednesdayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "wednesdayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "wednesdayEndTime"))
    })
    @Embedded
    private Availabilityy wednesday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "thursdayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "thursdayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "thursdayEndTime"))
    })
    @Embedded
    private Availabilityy thursday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "fridayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "fridayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "fridayEndTime"))
    })
    @Embedded
    private Availabilityy friday;
    
    @AttributeOverrides({
        @AttributeOverride(name = "availabilityOption", column = @Column(name = "mondayAvailabilityOption")),
        @AttributeOverride(name = "startTime", column = @Column(name = "mondayStartTime")),
        @AttributeOverride(name = "endTime", column = @Column(name = "mondayEndTime"))
    })
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
