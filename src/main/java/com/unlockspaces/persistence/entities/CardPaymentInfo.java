package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;

@Embeddable
public class CardPaymentInfo implements Serializable {

    @Basic
    private String expMonth;
    @Basic
    private String zipCode;
    @Basic
    private String cardHolderName;
    @Basic
    private String expYear;
    @Basic
    private String cardType;
    @Basic
    private String securityCode;
    @Basic
    private String cardNumber;

    public CardPaymentInfo() {

    }
   
    public String getExpMonth() {
        return this.expMonth;
    }

    public void setExpMonth(String expMonth) {
        this.expMonth = expMonth;
    }
   
    public String getZipCode() {
        return this.zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
   
    public String getCardHolderName() {
        return this.cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }
   
    public String getExpYear() {
        return this.expYear;
    }

    public void setExpYear(String expYear) {
        this.expYear = expYear;
    }
   
    public String getCardType() {
        return this.cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }
   
    public String getSecurityCode() {
        return this.securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }
   
    public String getCardNumber() {
        return this.cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
   
   
}
