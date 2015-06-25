/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.CancelationPolicy;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("cp")
public class CancelationPolicyTypesFacadeREST extends AbstractFacade<CancelationPolicy> {
    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public CancelationPolicyTypesFacadeREST() {
        super(CancelationPolicy.class);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public CancelationPolicy find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<CancelationPolicy> findAll() {
        System.out.println("CancelationPolicy.findAll()");
        final List<CancelationPolicy> findAll = super.findAll();
        System.out.println("Done with CancelationPolicy.findAll() found " + findAll.size() + " elements.");
        return findAll;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<CancelationPolicy> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
