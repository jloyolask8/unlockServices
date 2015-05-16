package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class PayPalPaymentInfo implements Serializable {

    @Basic
    private String payerId;
    
    //TODO add more fields as needed when using the paypal API
   

    public PayPalPaymentInfo() {

    }
   
    public String getPayerId() {
        return this.payerId;
    }

    public void setPayerId(String payerId) {
        this.payerId = payerId;
    }
   
    
}
