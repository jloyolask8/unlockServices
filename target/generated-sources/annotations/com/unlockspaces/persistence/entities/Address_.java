package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.City;
import com.unlockspaces.persistence.entities.Country;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Address.class)
public class Address_ { 

    public static volatile SingularAttribute<Address, String> region;
    public static volatile SingularAttribute<Address, String> postalCode;
    public static volatile SingularAttribute<Address, String> line1;
    public static volatile SingularAttribute<Address, String> addressOnMap;
    public static volatile SingularAttribute<Address, Country> country;
    public static volatile SingularAttribute<Address, City> city;
    public static volatile SingularAttribute<Address, String> line2;

}