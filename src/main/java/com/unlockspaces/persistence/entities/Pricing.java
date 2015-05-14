package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class Pricing implements Serializable {

    @Basic
    private String mode;
    @Basic
    private String perMonth;
    @Basic
    private String perWeek;
    @Embedded
    private Currency currency;
    @Basic
    private String perHour;
    @Basic
    private String perDay;
    @Basic
    private Integer tax;

    public Pricing() {

    }

    public String getMode() {
        return this.mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getPerMonth() {
        return this.perMonth;
    }

    public void setPerMonth(String perMonth) {
        this.perMonth = perMonth;
    }

    public String getPerWeek() {
        return this.perWeek;
    }

    public void setPerWeek(String perWeek) {
        this.perWeek = perWeek;
    }

    public Currency getCurrency() {
        return this.currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getPerHour() {
        return this.perHour;
    }

    public void setPerHour(String perHour) {
        this.perHour = perHour;
    }

    public String getPerDay() {
        return this.perDay;
    }

    public void setPerDay(String perDay) {
        this.perDay = perDay;
    }

    /**
     * @return the tax
     */
    public Integer getTax() {
        return tax;
    }

    /**
     * @param tax the tax to set
     */
    public void setTax(Integer tax) {
        this.tax = tax;
    }
}
