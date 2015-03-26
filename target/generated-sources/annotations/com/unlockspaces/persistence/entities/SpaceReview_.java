package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(SpaceReview.class)
public class SpaceReview_ { 

    public static volatile SingularAttribute<SpaceReview, Long> id;
    public static volatile SingularAttribute<SpaceReview, Date> creationDate;
    public static volatile SingularAttribute<SpaceReview, String> text;
    public static volatile SingularAttribute<SpaceReview, Date> lastModifDate;
    public static volatile SingularAttribute<SpaceReview, Integer> rating;
    public static volatile SingularAttribute<SpaceReview, Space> space;
    public static volatile SingularAttribute<SpaceReview, Usuario> reviewedBy;

}