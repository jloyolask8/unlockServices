package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Amenity;
import com.unlockspaces.persistence.entities.CancelationPolicy;
import com.unlockspaces.persistence.entities.Overview;
import com.unlockspaces.persistence.entities.Picture;
import com.unlockspaces.persistence.entities.Pricing;
import com.unlockspaces.persistence.entities.ReservationMethod;
import com.unlockspaces.persistence.entities.SpaceCategory;
import com.unlockspaces.persistence.entities.SpaceReview;
import com.unlockspaces.persistence.entities.SpaceStatus;
import com.unlockspaces.persistence.entities.SpaceType;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Space.class)
public class Space_ { 

    public static volatile SingularAttribute<Space, SpaceStatus> spaceStatus;
    public static volatile CollectionAttribute<Space, SpaceReview> reviews;
    public static volatile CollectionAttribute<Space, Amenity> amenitiesAvailable;
    public static volatile SingularAttribute<Space, Date> lastModifDate;
    public static volatile SingularAttribute<Space, CancelationPolicy> cancelationPolicy;
    public static volatile SingularAttribute<Space, Venue> venue;
    public static volatile SingularAttribute<Space, SpaceType> type;
    public static volatile SingularAttribute<Space, Pricing> pricing;
    public static volatile CollectionAttribute<Space, Picture> photos;
    public static volatile SingularAttribute<Space, ReservationMethod> reservationMethod;
    public static volatile SingularAttribute<Space, Long> id;
    public static volatile SingularAttribute<Space, Date> creationDate;
    public static volatile SingularAttribute<Space, SpaceCategory> category;
    public static volatile SingularAttribute<Space, Usuario> createdBy;
    public static volatile SingularAttribute<Space, Overview> overview;
    public static volatile SingularAttribute<Space, Integer> capacity;
    public static volatile SingularAttribute<Space, Picture> frontPhoto;

}