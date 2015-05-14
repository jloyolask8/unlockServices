package com.unlockspaces.persistence.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Reservation implements Serializable {

    //Reservation IDs should be generated with bussiness logic, TODO change serial to a string
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //space selected for booking
    @OneToOne(targetEntity = Space.class)
    private Space space;

    //  Booking details
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date startDateTime;
    @Temporal(TemporalType.TIMESTAMP)
    @Basic
    private Date endDateTime;
    @Basic
    private String title;

    @ElementCollection
    private Collection<String> attendeesEmails;

    @Basic
    private int numberOfPeople;

    //Payment details
    @OneToOne(targetEntity = PaymentMethod.class)
    private PaymentMethod paymentMethod;
    //if selected paypal, here comes the paypal account
    @Embedded
    private PayPalPaymentInfo payPalPaymentInfo;
    //if selected credit card, here comes the card info
    @Embedded
    private CardPaymentInfo cardPaymentInfo;

    @OneToOne(targetEntity = ReservationStatus.class)
    private ReservationStatus reservationStatus;

    //    Reservation system info
    @Basic
    private String creationDate;

    @Basic
    private String lastModifDate;

    @ManyToOne(targetEntity = Usuario.class)
    private Usuario reservedBy;

    public Reservation() {

    }

    public PayPalPaymentInfo getPayPalPaymentInfo() {
        return this.payPalPaymentInfo;
    }

    public void setPayPalPaymentInfo(PayPalPaymentInfo payPalPaymentInfo) {
        this.payPalPaymentInfo = payPalPaymentInfo;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getEndDateTime() {
        return this.endDateTime;
    }

    public void setEndDateTime(Date endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public Collection<String> getAttendeesEmails() {
        return this.attendeesEmails;
    }

    public void setAttendeesEmails(Collection<String> attendeesEmails) {
        this.attendeesEmails = attendeesEmails;
    }

    public Space getSpace() {
        return this.space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public CardPaymentInfo getCardPaymentInfo() {
        return this.cardPaymentInfo;
    }

    public void setCardPaymentInfo(CardPaymentInfo cardPaymentInfo) {
        this.cardPaymentInfo = cardPaymentInfo;
    }

    public Date getStartDateTime() {
        return this.startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Usuario getReservedBy() {
        return this.reservedBy;
    }

    public void setReservedBy(Usuario reservedBy) {
        this.reservedBy = reservedBy;
    }

    public PaymentMethod getPaymentMethod() {
        return this.paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastModifDate() {
        return this.lastModifDate;
    }

    public void setLastModifDate(String lastModifDate) {
        this.lastModifDate = lastModifDate;
    }

    public int getNumberOfPeople() {
        return this.numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public ReservationStatus getReservationStatus() {
        return this.reservationStatus;
    }

    public void setReservationStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
}
