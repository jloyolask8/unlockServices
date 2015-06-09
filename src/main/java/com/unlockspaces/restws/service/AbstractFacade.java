/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.auth0.Auth0User;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import com.unlockspaces.interceptors.JWTFilter;
import com.unlockspaces.interceptors.NoAuthorizationException;
import com.unlockspaces.jpautils.OrderBy;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.persistence.entities.Venue_;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.binary.Base64;
import temporal.jpacontrollers.exceptions.NonexistentEntityException;
import temporal.jpacontrollers.exceptions.RollbackFailureException;

/**
 *
 * @author jonathan
 */
public abstract class AbstractFacade<T> {

    // Jersey will inject proxy of HttpServletRequest
//    @Context
//    protected HttpServletRequest request;
    private Class<T> entityClass;

    private final JWTVerifier jwtVerifier;

    public AbstractFacade(Class<T> entityClass) {
        this.entityClass = entityClass;
        jwtVerifier = new JWTVerifier(
                new Base64(true).decodeBase64(JWTFilter.AUTH0_CLIENT_SECRET),
                JWTFilter.AUTH0_CLIENT_ID);
    }

    protected List<Venue> findVenuesByUser(Usuario user, OrderBy orderBy) {
        System.out.println("findVenuesByUser:" + user);
        try {

            if (user != null) {
                CriteriaBuilder criteriaBuilder = getEntityManager().getCriteriaBuilder();
                CriteriaQuery criteriaQuery = criteriaBuilder.createQuery(Venue.class);
                Root root = criteriaQuery.from(Venue.class);

                criteriaQuery.where(criteriaBuilder.equal(root.get(Venue_.createdBy), user));
//               .and(criteriaQuery.equal(pet.get(Pet_.color), "brown")));

//            if (predicate != null) {
//                criteriaQuery.where(predicate).distinct(true);
//            }
                if (orderBy != null && orderBy.getFieldName() != null) {
                    if (orderBy.getOrderType().equals(OrderBy.OrderType.ASC)) {
                        criteriaQuery.orderBy(criteriaBuilder.asc(root.get(orderBy.getFieldName())));
                    } else {
                        criteriaQuery.orderBy(criteriaBuilder.desc(root.get(orderBy.getFieldName())));
                    }

                }
                Query q = getEntityManager().createQuery(criteriaQuery);

//            if (!all) {
//                q.setMaxResults(maxResults);
//                q.setFirstResult(firstResult);
//            }
                return q.getResultList();
            }

        } catch (Exception ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage());
        }

        return Collections.EMPTY_LIST;

    }

//    public Usuario findUsuarioByUserId(String userId) {
//        Usuario usuario;
//        try {
//            usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByUserId").setParameter("userId", userId).getSingleResult();
//            return usuario;
//        } catch (javax.persistence.NoResultException no) {
//            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, "Usuario not found: {0}", userId);
//        }
//        return null;
//    }
    protected Usuario mergeOrCreateUser(Auth0User userData) {
        Usuario usuario;
        try {
            //findByUserId.userId
            usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByEmail").setParameter("email", userData.getEmail()).getSingleResult();
        } catch (javax.persistence.NoResultException no) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, "Usuario not found for email/id: {0}", userData.getEmail());
            usuario = null;
        }

        if (usuario == null) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
            usuario = new Usuario();
            usuario.setCreationDate(sdf.format(new Date()));
            usuario.setUserId(userData.getUserId());
            usuario.setUsername(userData.getNickname());
            setUserData(usuario, userData);

            getEntityManager().persist(usuario);
        } else {
            setUserData(usuario, userData);
            usuario = getEntityManager().merge(usuario);
        }

        return usuario;
    }

    protected Usuario findUsuarioByUserId(String userId) {
        Usuario usuario = null;
        try {
            //findByUserId.userId
            usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByUserId").setParameter("userId", userId).getSingleResult();
        } catch (javax.persistence.NoResultException no) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, "Usuario not found for email/id: {0}", userId);
        }

        return usuario;
    }

    /**
     * To get a user we rely on the authorization header set by auth0.com This
     * method will check if the user exists in the database. have a Users table,
     * that would have a copy of each user coming from Auth0, without passwords
     * of course?. Every time a users logs in, you would search that user if it
     * does not exist, insert it, if it does, update all the fields, essentially
     * keeping a local copy of the user data.
     *
     * @param req
     * @return
     */
//    public Usuario getUsuarioFromSession(javax.servlet.http.HttpServletRequest req) {
//       
//        Auth0User userData = Auth0User.get(req);
//        
//        System.out.println("userData:" + userData);
//        final String userId = (String) userData.getEmail();//We will use the email as the id for the user
//
//        Usuario usuario;
//        try {
//            usuario = (Usuario) getEntityManager().createNamedQuery("Usuario.findByEmail").setParameter("email", userId).getSingleResult();
//        } catch (javax.persistence.NoResultException no) {
//            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, "Usuario not found for email/id: {0}", userId);
//            usuario = null;
//        }
//
//        if (usuario == null) {
//            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
//            usuario = new Usuario();
//            usuario.setCreationDate(sdf.format(new Date()));
//            usuario.setUserId(userId);
//            usuario.setUsername(userData.getNickname());
//            setUserData(usuario, userData);
//
//            getEntityManager().persist(usuario);
//        } else {
//            setUserData(usuario, userData);
//            usuario = getEntityManager().merge(usuario);
//        }
//
//        return usuario;
//    }
//
    protected void setUserData(Usuario usuario, final Auth0User userData) {
        usuario.setEmail(userData.getEmail());
        usuario.setUsername(userData.getEmail());
        usuario.setPicture(userData.getPicture());
        usuario.setCreationDate((String) userData.getProperty("created_at"));

        usuario.setGenre((String) userData.getProperty("gender"));
        usuario.setLastname((String) userData.getProperty("family_name"));
        usuario.setName((String) userData.getProperty("given_name"));
        usuario.setLocale((String) userData.getProperty("locale"));
    }

    /**
     * example: decoded: {iss=https://unlockspaces.auth0.com/,
     * sub=google-oauth2|109202765438194828936,
     * aud=8e3elusXRGQ8Jp2vv0i3T8B3KcW4zWeG, exp=1433849128, iat=1433813128} sub
     * is the user id
     *
     * @param headers
     * @return
     */
    public String getLoggedUserId(HttpHeaders headers) {
        return (String) getUserData(headers.getHeaderString("authorization")).get("sub");
    }

    public Map<String, Object> getUserData(String authorizationHeader) {
        try {
            String token = JWTFilter.getToken(authorizationHeader);
            Map<String, Object> decoded = jwtVerifier.verify(token);
            return decoded;
        } catch (NoAuthorizationException | NoSuchAlgorithmException | InvalidKeyException | IllegalStateException | IOException | SignatureException | JWTVerifyException ex) {
            Logger.getLogger(AbstractFacade.class.getName()).log(Level.SEVERE, null, ex);
        }

        return Collections.EMPTY_MAP;
    }

    protected abstract EntityManager getEntityManager();

    public void create(T entity) {
        getEntityManager().persist(entity);
        getEntityManager().flush();
    }

    public void edit(T entity) {
        getEntityManager().merge(entity);
    }

    public void remove(T entity) {
        getEntityManager().remove(getEntityManager().merge(entity));
    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }

    public List<T> findAll() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        cq.select(cq.from(entityClass));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        javax.persistence.criteria.CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        javax.persistence.criteria.Root<T> rt = cq.from(entityClass);
        cq.select(getEntityManager().getCriteriaBuilder().count(rt));
        javax.persistence.Query q = getEntityManager().createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

    public Response.ResponseBuilder getCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(false);
        cc.setMaxAge(300);
        cc.setMustRevalidate(false);
        return Response.status(status).cacheControl(cc);
    }

    public Response.ResponseBuilder getNoCacheResponseBuilder(Response.Status status) {
        CacheControl cc = new CacheControl();
        cc.setNoCache(true);
        cc.setMaxAge(-1);
        cc.setMustRevalidate(true);
        return Response.status(status).cacheControl(cc);
    }

    @TransactionAttribute(value = TransactionAttributeType.REQUIRED)
    public void editarVenue(Venue venue) throws NonexistentEntityException, RollbackFailureException, Exception {
        EntityManager em = null;
        try {
//            utx.begin();
            em = getEntityManager();
            Venue persistentVenue = em.find(Venue.class, venue.getId());
            Usuario createdByOld = persistentVenue.getCreatedBy();
            Usuario createdByNew = venue.getCreatedBy();
            List<Space> spacesOld = persistentVenue.getSpaces();
            List<Space> spacesNew = venue.getSpaces();
            if (createdByNew != null) {
                createdByNew = em.getReference(createdByNew.getClass(), createdByNew.getSystemId());
                venue.setCreatedBy(createdByNew);
            }
            List<Space> attachedSpacesNew = new ArrayList<>();
            for (Space spacesNewSpaceToAttach : spacesNew) {
                spacesNewSpaceToAttach = em.getReference(spacesNewSpaceToAttach.getClass(), spacesNewSpaceToAttach.getId());
                attachedSpacesNew.add(spacesNewSpaceToAttach);
            }
            spacesNew = attachedSpacesNew;
            venue.setSpaces(spacesNew);
            venue = em.merge(venue);
            if (createdByOld != null && !createdByOld.equals(createdByNew)) {
                createdByOld.getVenuesListed().remove(venue);
                createdByOld = em.merge(createdByOld);
            }
            if (createdByNew != null && !createdByNew.equals(createdByOld)) {
                createdByNew.getVenuesListed().add(venue);
                createdByNew = em.merge(createdByNew);
            }
            for (Space spacesOldSpace : spacesOld) {
                if (!spacesNew.contains(spacesOldSpace)) {
                    spacesOldSpace.setVenue(null);
                    spacesOldSpace = em.merge(spacesOldSpace);
                }
            }
            for (Space spacesNewSpace : spacesNew) {
                if (!spacesOld.contains(spacesNewSpace)) {
                    Venue oldVenueOfSpacesNewSpace = spacesNewSpace.getVenue();
                    spacesNewSpace.setVenue(venue);
                    spacesNewSpace = em.merge(spacesNewSpace);
                    if (oldVenueOfSpacesNewSpace != null && !oldVenueOfSpacesNewSpace.equals(venue)) {
                        oldVenueOfSpacesNewSpace.getSpaces().remove(spacesNewSpace);
                        oldVenueOfSpacesNewSpace = em.merge(oldVenueOfSpacesNewSpace);
                    }
                }
            }
//            utx.commit();
        } catch (Exception ex) {

            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Long id = venue.getId();
                if (find(id) == null) {
                    throw new NonexistentEntityException("The venue with id " + id + " no longer exists.");
                }
            }
            throw ex;
        }
//        finally {
////            if (em != null) {
////                em.close();
////            }
//        }
    }

}
