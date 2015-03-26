package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Address;
import com.unlockspaces.persistence.entities.ContactInfo;
import com.unlockspaces.persistence.entities.HoursOfOperation;
import com.unlockspaces.persistence.entities.Organization;
import com.unlockspaces.persistence.entities.Overview;
import com.unlockspaces.persistence.entities.Picture;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Venue.class)
public class Venue_ { 

    public static volatile SingularAttribute<Venue, HoursOfOperation> hoursOfOperation;
    public static volatile CollectionAttribute<Venue, Picture> photos;
    public static volatile SingularAttribute<Venue, Long> id;
    public static volatile SingularAttribute<Venue, Date> creationDate;
    public static volatile CollectionAttribute<Venue, Space> spaces;
    public static volatile SingularAttribute<Venue, String> timezone;
    public static volatile SingularAttribute<Venue, Organization> organization;
    public static volatile SingularAttribute<Venue, Picture> venueLogo;
    public static volatile SingularAttribute<Venue, Overview> overview;
    public static volatile SingularAttribute<Venue, ContactInfo> contactInfo;
    public static volatile SingularAttribute<Venue, Usuario> createdBy;
    public static volatile SingularAttribute<Venue, Address> address;
    public static volatile SingularAttribute<Venue, Date> lastModifDate;
    public static volatile SingularAttribute<Venue, Picture> frontPhoto;

}