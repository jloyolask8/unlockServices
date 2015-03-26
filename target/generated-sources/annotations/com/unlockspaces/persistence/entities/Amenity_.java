package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Space;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Amenity.class)
public class Amenity_ { 

    public static volatile SingularAttribute<Amenity, Long> id;
    public static volatile CollectionAttribute<Amenity, Space> spaces;
    public static volatile SingularAttribute<Amenity, String> details;
    public static volatile SingularAttribute<Amenity, String> name;

}