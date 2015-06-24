package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class ReservationStatus implements Serializable {

    public enum EnumReservationStatus {

        APPROVED(new ReservationStatus("APPROVED", "APPROVED")),
        PENDING(new ReservationStatus("PENDING", "PENDING")), 
        REJECTED(new ReservationStatus("REJECTED", "REJECTED")), 
        CANCELED_BY_USER(new ReservationStatus("CANCELED_BY_USER", "CANCELED_BY_USER")), 
        CANCELED_BY_OWNER(new ReservationStatus("CANCELED_BY_OWNER", "CANCELED_BY_OWNER"));

        private ReservationStatus reservationStatus;

        EnumReservationStatus(ReservationStatus reservationStatus) {
            this.reservationStatus = reservationStatus;
        }

        public ReservationStatus getReservationStatus() {
            return reservationStatus;
        }
    }

    @Basic
    private String name;
    @Basic
    private String details;
    @Id
    private String id;

    public ReservationStatus(String id, String name) {
        this.name = name;
        this.id = id;
    }

    public ReservationStatus() {

    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return this.details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
