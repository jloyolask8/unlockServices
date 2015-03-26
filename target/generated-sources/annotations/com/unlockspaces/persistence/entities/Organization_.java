package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Organization.class)
public class Organization_ { 

    public static volatile SingularAttribute<Organization, Long> id;
    public static volatile CollectionAttribute<Organization, Usuario> users;
    public static volatile SingularAttribute<Organization, String> name;
    public static volatile SingularAttribute<Organization, String> selfDescription;

}