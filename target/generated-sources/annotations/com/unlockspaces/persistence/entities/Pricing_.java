package com.unlockspaces.persistence.entities;

import com.unlockspaces.persistence.entities.Currency;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-26T18:44:21")
@StaticMetamodel(Pricing.class)
public class Pricing_ { 

    public static volatile SingularAttribute<Pricing, String> perDay;
    public static volatile SingularAttribute<Pricing, String> perWeek;
    public static volatile SingularAttribute<Pricing, String> mode;
    public static volatile SingularAttribute<Pricing, String> perMonth;
    public static volatile SingularAttribute<Pricing, Currency> currency;
    public static volatile SingularAttribute<Pricing, String> perHour;

}