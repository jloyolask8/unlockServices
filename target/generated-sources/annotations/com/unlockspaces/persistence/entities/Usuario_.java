package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Organization;
import com.unlockspaces.persistence.entities.Reservation;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.SpaceReview;
import com.unlockspaces.persistence.entities.UserNotification;
import com.unlockspaces.persistence.entities.Venue;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Usuario.class)
public class Usuario_ extends Person_ {

    public static volatile SingularAttribute<Usuario, String> creationDate;
    public static volatile SingularAttribute<Usuario, Organization> organization;
    public static volatile SingularAttribute<Usuario, String> username;
    public static volatile CollectionAttribute<Usuario, SpaceReview> spaceReviews;
    public static volatile CollectionAttribute<Usuario, Space> spacesListed;
    public static volatile SingularAttribute<Usuario, String> lastModifDate;
    public static volatile CollectionAttribute<Usuario, UserNotification> notificationsReceived;
    public static volatile SingularAttribute<Usuario, String> password;
    public static volatile CollectionAttribute<Usuario, Venue> venuesListed;
    public static volatile CollectionAttribute<Usuario, Reservation> reservations;

}