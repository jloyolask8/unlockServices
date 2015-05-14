/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

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
@Path("venuetypes")
public class VenueTypesFacadeREST {

    public VenueTypesFacadeREST() {
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public List<String> getAll() {
        List<String> list = new ArrayList<>();
        list.add("Bussiness Center");
        list.add("Corporate Offices");
        list.add("Coworking spaces");
        list.add("Startup offices");

        return list;
    }

}
