package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SpaceStatus implements Serializable {

    @Id
    private Long id;

    public SpaceStatus() {

    }
   
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
