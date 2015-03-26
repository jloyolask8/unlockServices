package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(UserNotification.class)
public class UserNotification_ { 

    public static volatile SingularAttribute<UserNotification, Long> id;
    public static volatile SingularAttribute<UserNotification, Date> creationDate;
    public static volatile SingularAttribute<UserNotification, String> title;
    public static volatile SingularAttribute<UserNotification, String> details;
    public static volatile SingularAttribute<UserNotification, Usuario> targetUser;
    public static volatile SingularAttribute<UserNotification, Boolean> read;

}