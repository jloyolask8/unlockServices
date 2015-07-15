/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.restws.service;

import com.auth0.Auth0User;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import com.microtripit.mandrillapp.lutung.MandrillApi;
import com.microtripit.mandrillapp.lutung.model.MandrillApiError;
import com.microtripit.mandrillapp.lutung.view.MandrillMessage;
import com.microtripit.mandrillapp.lutung.view.MandrillMessageStatus;
import com.microtripit.mandrillapp.lutung.view.MandrillTemplate;
import com.unlockspaces.interceptors.JWTFilter;
import com.unlockspaces.interceptors.NoAuthorizationException;
import com.unlockspaces.jpautils.OrderBy;
import com.unlockspaces.jsf.util.TaskExecutor;
import com.unlockspaces.persistence.entities.Identity;
import com.unlockspaces.persistence.entities.MailTemplate;
import com.unlockspaces.persistence.entities.Space;
import com.unlockspaces.persistence.entities.UserNotification;
import com.unlockspaces.persistence.entities.UserNotification_;
import com.unlockspaces.persistence.entities.Usuario;
import com.unlockspaces.persistence.entities.Venue;
import com.unlockspaces.persistence.entities.Venue_;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
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
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import temporal.jpacontrollers.exceptions.NonexistentEntityException;
import temporal.jpacontrollers.exceptions.RollbackFailureException;
import us.monoid.json.JSONArray;
import us.monoid.json.JSONException;
import us.monoid.json.JSONObject;

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
    
    public void sendNotification(final Usuario usuario, MailTemplate templateId, final String notificationDetail, final String notificationTitle) throws MandrillApiError, IOException {
        final MailTemplate templateIdFromDB = getEntityManager().find(MailTemplate.class, templateId.getName());
        TaskExecutor.submitTask(new Runnable() {
            @Override
            public void run() {
                try {
                    sendNotif(usuario, templateIdFromDB, notificationDetail, notificationTitle);
                } catch (MandrillApiError ex) {
                    Logger.getLogger(AbstractFacade.class.getName()).log(Level.SEVERE, null, ex);
                } catch (IOException ex) {
                    Logger.getLogger(AbstractFacade.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
    }
    
    private void sendNotif(Usuario usuario, MailTemplate templateId, String notificationDetail, String notificationTitle) throws MandrillApiError, IOException {
        
        MandrillApi mandrillApi = new MandrillApi("-pOrmLXkRDWIQBOsPSAIwQ");
// create your message
        MandrillMessage message = new MandrillMessage();
        MandrillTemplate template = mandrillApi.templates().info(templateId.getTemplate());
        Map<String, String> map = new HashMap<>();
        map.put("test", "test");
        String messageHtml = mandrillApi.templates().render(templateId.getTemplate(), map, new HashMap<String, String>());
        message.setSubject(template.getSubject());
        message.setHtml(messageHtml);
        message.setAutoText(true);
        message.setFromEmail(template.getFromEmail());
        message.setFromName(template.getFromName());
        ArrayList<MandrillMessage.Recipient> recipients = new ArrayList<>();
        MandrillMessage.Recipient recipient = new MandrillMessage.Recipient();
        recipient.setEmail(usuario.getEmail());
        recipient.setName(usuario.getName()+" "+usuario.getLastname());
        recipients.add(recipient);
        message.setTo(recipients);
        message.setPreserveRecipients(true);

        MandrillMessageStatus[] messageStatusReports = mandrillApi
                .messages().send(message, true);
        createNotification(notificationDetail, usuario, notificationTitle);
    }

    private void createNotification(String notificationDetail, Usuario usuario, String notificationTitle) {
        UserNotification notification = new UserNotification();
        notification.setCreationDate(new Date());
        notification.setDetails(notificationDetail);
        notification.setRead(false);
        notification.setTargetUser(usuario);
        notification.setTitle(notificationTitle);
        getEntityManager().persist(notification);
    }

    protected List<UserNotification> findUnreadNotificationsByUser(Usuario user) {
        System.out.println("findUnreadNotificationsByUser:" + user);
        try {

            if (user != null) {
                CriteriaBuilder criteriaBuilder = getEntityManager().getCriteriaBuilder();
                CriteriaQuery criteriaQuery = criteriaBuilder.createQuery(UserNotification.class);
                Root root = criteriaQuery.from(UserNotification.class);
                Predicate equalUser = criteriaBuilder.equal(root.get(UserNotification_.targetUser), user);
                Predicate unread = criteriaBuilder.equal(root.get(UserNotification_.read), false);

                criteriaQuery.where(criteriaBuilder.and(equalUser, unread));
                criteriaQuery.orderBy(criteriaBuilder.desc(root.get(UserNotification_.creationDate.getName())));
                Query q = getEntityManager().createQuery(criteriaQuery);

//            if (!all) {
                q.setMaxResults(10);
                q.setFirstResult(0);
//            }
                return q.getResultList();
            }

        } catch (Exception ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage());
        }

        return Collections.EMPTY_LIST;

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
            usuario = (Usuario) getEntityManager()
                    .createNamedQuery("Usuario.findByUserId").setParameter("userId", userId)
                    .getSingleResult();
        } catch (javax.persistence.NoResultException no) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, "Usuario not found for email/id: {0}", userId);
        }

        return usuario;
    }

    /**
     * To get a user we rely on the authorization header set by auth0.com This
     * method will check if the user exists in the database. have a Users table,
     * that would have a copy of each user coming from Auth0, without passwords
     * of course??? well passwords are needed for those users that singed up
     * without a social provider identity. Every time a users logs in, you would
     * search that user - if it does not exist, we save it, if it does exists,
     * we update all the fields. Essentially, we are just keeping a local copy
     * of the user data.
     *
     * @param usuario
     * @param userData
     */
    protected void setUserData(Usuario usuario, final Auth0User userData) {

        if (StringUtils.isEmpty(usuario.getUsername())) {
            usuario.setUsername(userData.getNickname());
        }
        if (StringUtils.isEmpty(usuario.getPicture())) {
            usuario.setPicture(userData.getPicture());
        }

        try {
            if (StringUtils.isEmpty(usuario.getEmail())) {
                usuario.setEmail(userData.getEmail());
            }
        } catch (Exception e) {
            System.out.println("email not found");
        }

        try {
            if (StringUtils.isEmpty(usuario.getGenre())) {
                final String emailv = (String) userData.getProperty("email_verified");
                final Boolean email_verified = Boolean.valueOf(emailv);
                usuario.setEmailVerified(email_verified);
            }
        } catch (Exception e) {
            System.out.println("email_verified not found");
        }

        try {
            if (StringUtils.isEmpty(usuario.getGenre())) {
                usuario.setGenre((String) userData.getProperty("gender"));
            }
        } catch (Exception e) {
            System.out.println("gender not found");
        }
        try {
            if (StringUtils.isEmpty(usuario.getLastname())) {
                usuario.setLastname((String) userData.getProperty("family_name"));
            }
        } catch (Exception e) {
            System.out.println("family_name not found");
        }
        try {
            if (StringUtils.isEmpty(usuario.getName())) {
                usuario.setName((String) userData.getProperty("given_name"));
            }
        } catch (Exception e) {
            System.out.println("given_name not found");
        }

        try {
            if (StringUtils.isEmpty(usuario.getLocale())) {
                usuario.setLocale((String) userData.getProperty("locale"));
            }
        } catch (Exception e) {
            System.out.println("locale not found");
        }

        try {
            if (StringUtils.isEmpty(usuario.getCreationDate())) {
                usuario.setCreationDate(userData.getProperty("created_at"));
            }
        } catch (Exception e) {
            System.out.println("locale not found");
        }

        final JSONArray identities = userData.getIdentities();

        Collection<Identity> identitiesCollection = new ArrayList(identities.length());

        //Check the identity provider(s), to save them in our db.
        for (int i = 0; i < identities.length(); i++) {
            try {
                Identity identity = new Identity();
                final JSONObject jsonObject = identities.getJSONObject(i);

                identity.setProvider((String) jsonObject.get("provider"));
                identity.setAccessToken((String) jsonObject.get("access_token"));
                identity.setIsSocial(jsonObject.getBoolean("isSocial"));
                identity.setConnection((String) jsonObject.get("connection"));
                identity.setUserId((String) jsonObject.get("user_id"));

                identitiesCollection.add(identity);

            } catch (JSONException ex) {
                Logger.getLogger(AbstractFacade.class.getName()).log(Level.SEVERE, null, ex);
            }

        }

        usuario.setIdentities(identitiesCollection);

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
