package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class PayPalPaymentInfo implements Serializable {

    @Basic
    private String payerId;
    @Basic
    private String status;

    public PayPalPaymentInfo() {

    }
   
    public String getPayerId() {
        return this.payerId;
    }

    public void setPayerId(String payerId) {
        this.payerId = payerId;
    }
   
    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
