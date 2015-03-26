package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Country;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(City.class)
public class City_ { 

    public static volatile SingularAttribute<City, String> id_code;
    public static volatile SingularAttribute<City, String> name;
    public static volatile SingularAttribute<City, Country> country;

}