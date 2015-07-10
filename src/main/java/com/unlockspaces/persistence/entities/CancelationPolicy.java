package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class CancelationPolicy implements Serializable {

    public enum CancelationPolicyEnum {

        FLEXIBLE(new CancelationPolicy("Flexible", "Flexible: Full refund 1 day prior to arrival, except fees", "Flexible: Full refund 1 day prior to arrival, except fees")),
        MODERATE(new CancelationPolicy("Moderate", "Moderate: Full refund 5 days prior to arrival, except fees", "Moderate: Full refund 5 days prior to arrival, except fees")),
        STRICT(new CancelationPolicy("Strict", "Strict: 50% refund up until 1 week prior to arrival, except fees", "Strict: 50% refund up until 1 week prior to arrival, except fees"));

        private CancelationPolicyEnum(CancelationPolicy cancelationPolicy) {
            this.cancelationPolicy = cancelationPolicy;
        }

        private CancelationPolicy cancelationPolicy;

        /**
         * @return the cancelationPolicy
         */
        public CancelationPolicy getCancelationPolicy() {
            return cancelationPolicy;
        }

    }

    @Basic
    private String name;
    @Basic
    private String details;
    @Id
    private String id;

    public CancelationPolicy() {

    }

    public CancelationPolicy(String id, String name, String details) {
        this.name = name;
        this.details = details;
        this.id = id;
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

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final CancelationPolicy other = (CancelationPolicy) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "" + name;
    }
    
    
}
