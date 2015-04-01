package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Invoice implements Serializable {

    @Id
    private Long id1_TBD;

    public Invoice() {

    }
   
    public Long getId1_TBD() {
        return this.id1_TBD;
    }

    public void setId1_TBD(Long id1_TBD) {
        this.id1_TBD = id1_TBD;
    }
}
