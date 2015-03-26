package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.City;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Country.class)
public class Country_ { 

    public static volatile SingularAttribute<Country, String> id_code;
    public static volatile SingularAttribute<Country, String> personIDName;
    public static volatile CollectionAttribute<Country, City> cities;
    public static volatile SingularAttribute<Country, String> name;
    public static volatile SingularAttribute<Country, String> idRegex;

}