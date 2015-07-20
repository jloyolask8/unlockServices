/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.unlockspaces.persistence.entities.UserNotification;
import com.unlockspaces.persistence.entities.Usuario;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("notifications")
public class NotificationsFacadeREST extends AbstractFacade<UserNotification> {

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public NotificationsFacadeREST() {
        super(UserNotification.class);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public UserNotification find(@PathParam("id") Long id) {
        return super.find(id);
    }

    @GET
    @Produces({"application/json"})
    public List<UserNotification> findByUser(@Context HttpHeaders headers) {

        try {
            String userID = getLoggedUserId(headers);
            System.out.println("userID:" + userID);
            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);
//            final Usuario usuarioFromSession = getUsuarioFromSession(request);
//            Usuario usuarioFromHeader = getUsuarioFromHeader(headers);
            
            final List<UserNotification> findByUser = findUnreadNotificationsByUser(findUsuarioByUserId);
            return findByUser;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Collections.EMPTY_LIST;
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<UserNotification> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
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
