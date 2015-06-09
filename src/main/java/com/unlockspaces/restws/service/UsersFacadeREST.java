/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.auth0.Auth0User;
import com.unlockspaces.persistence.entities.Usuario;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import us.monoid.json.JSONObject;

/**
 *
 * @author jonathan
 */
@Stateless
@Path("users")
public class UsersFacadeREST extends AbstractFacade<Usuario> {

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    public UsersFacadeREST() {
        super(Usuario.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public Response saveOrEditUser(@Context HttpHeaders headers, String entity) {

        System.out.println("saveOrEditUser:"+entity);
//        Usuario usuarioFromHeader = getUsuarioFromHeader(headers);
        String userID = getLoggedUserId(headers);
        System.out.println("userID:" + userID);
//        Usuario usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByUserId").setParameter("userId", userID).getSingleResult();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

        try {

            JSONObject json = new JSONObject(entity);
            System.out.println("json:" + json);
//            
            Auth0User userData = new Auth0User(json);
            System.out.println("userData:" + userData);

            Usuario findUsuarioByUserId = findUsuarioByUserId(userID);
            
            

            if (findUsuarioByUserId != null) {
                //merge
                setUserData(findUsuarioByUserId, userData);
                findUsuarioByUserId.setLastModifDate(sdf.format(new Date()));
                super.edit(findUsuarioByUserId);

            } else {
                //create
                findUsuarioByUserId = new Usuario();
                findUsuarioByUserId.setUserId(userID);
                setUserData(findUsuarioByUserId, userData);
                
                super.create(findUsuarioByUserId);
            }

            System.out.println("entity:" + findUsuarioByUserId);

            return Response.created(URI.create("/#/app/venues/list")).entity(entity).build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new WebApplicationException(e,
                    Response.Status.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
