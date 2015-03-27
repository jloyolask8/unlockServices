package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name = "space")
@Entity
public class SpaceD extends Space implements Serializable {

    @Column 
    private Double distance;

    public SpaceD() {
    }

    /**
     * @return the distance
     */@Transient
    public Double getDistance() {
        return distance;
    }

    /**
     * @param distance the distance to set
     */@Transient
    public void setDistance(Double distance) {
        this.distance = distance;
    }

}
