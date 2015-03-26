package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Address;
import com.unlockspaces.persistence.entities.Country;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Person.class)
public abstract class Person_ { 

    public static volatile SingularAttribute<Person, String> genre;
    public static volatile SingularAttribute<Person, Date> bornDate;
    public static volatile SingularAttribute<Person, String> identification;
    public static volatile SingularAttribute<Person, String> name;
    public static volatile SingularAttribute<Person, String> emailAddress;
    public static volatile SingularAttribute<Person, String> lastname;
    public static volatile SingularAttribute<Person, Long> systemId;
    public static volatile CollectionAttribute<Person, String> phoneNumbers;
    public static volatile SingularAttribute<Person, String> selfDescription;
    public static volatile CollectionAttribute<Person, Address> addresses;
    public static volatile SingularAttribute<Person, Country> country;

}