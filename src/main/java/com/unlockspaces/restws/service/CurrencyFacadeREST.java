/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.Currency;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("currencies")
public class CurrencyFacadeREST {

    public CurrencyFacadeREST() {
    }

    
    @GET
    @Produces({"application/xml", "application/json"})
    public List<Currency> findAll() {
        List<Currency> list = new ArrayList<>();
        list.add(new Currency("CLP"));
        list.add(new Currency("USD"));
        return list;
    }

  
    
}
