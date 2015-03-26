package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Picture.class)
public class Picture_ { 

    public static volatile SingularAttribute<Picture, Long> id;
    public static volatile SingularAttribute<Picture, Date> creationDate;
    public static volatile SingularAttribute<Picture, Usuario> uploadedBy;
    public static volatile SingularAttribute<Picture, String> cloudinaryUrl3;
    public static volatile SingularAttribute<Picture, String> cloudinaryUrl1;
    public static volatile SingularAttribute<Picture, String> cloudinaryUrl2;
    public static volatile SingularAttribute<Picture, String> filename;
    public static volatile SingularAttribute<Picture, Space> space;
    public static volatile SingularAttribute<Picture, String> mimeType;

}