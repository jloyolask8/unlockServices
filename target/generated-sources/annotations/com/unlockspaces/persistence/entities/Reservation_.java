package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.CardPaymentInfo;
import com.unlockspaces.persistence.entities.PayPalPaymentInfo;
import com.unlockspaces.persistence.entities.PaymentMethod;
import com.unlockspaces.persistence.entities.ReservationStatus;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Reservation.class)
public class Reservation_ { 

    public static volatile SingularAttribute<Reservation, Integer> numberOfPeople;
    public static volatile SingularAttribute<Reservation, Date> startDateTime;
    public static volatile SingularAttribute<Reservation, PayPalPaymentInfo> payPalPaymentInfo;
    public static volatile SingularAttribute<Reservation, String> lastModifDate;
    public static volatile SingularAttribute<Reservation, Space> space;
    public static volatile SingularAttribute<Reservation, Usuario> reservedBy;
    public static volatile SingularAttribute<Reservation, Date> endDateTime;
    public static volatile SingularAttribute<Reservation, Long> id;
    public static volatile SingularAttribute<Reservation, String> creationDate;
    public static volatile SingularAttribute<Reservation, String> title;
    public static volatile CollectionAttribute<Reservation, String> attendeesEmails;
    public static volatile SingularAttribute<Reservation, ReservationStatus> reservationStatus;
    public static volatile SingularAttribute<Reservation, PaymentMethod> paymentMethod;
    public static volatile SingularAttribute<Reservation, CardPaymentInfo> cardPaymentInfo;

}