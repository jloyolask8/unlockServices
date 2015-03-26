package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ReservationMethod implements Serializable {

    @Id
    private Long id;

    public ReservationMethod() {

    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
