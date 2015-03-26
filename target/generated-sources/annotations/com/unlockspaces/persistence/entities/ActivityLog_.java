package com.unlockspaces.persistence.entities;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(ActivityLog.class)
public class ActivityLog_ { 

    public static volatile SingularAttribute<ActivityLog, Date> creationDateTime;
    public static volatile SingularAttribute<ActivityLog, Long> idLog;
    public static volatile SingularAttribute<ActivityLog, String> status;
    public static volatile SingularAttribute<ActivityLog, String> description;
    public static volatile SingularAttribute<ActivityLog, String> userId;
    public static volatile SingularAttribute<ActivityLog, String> spaceId;

}