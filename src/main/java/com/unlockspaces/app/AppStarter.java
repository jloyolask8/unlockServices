/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.app;

import com.unlockspaces.persistence.entities.CancelationPolicy;
import com.unlockspaces.persistence.entities.ReservationStatus;
import com.unlockspaces.persistence.entities.SpaceStatus;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

/**
 *
 * @author jonathan
 */
//@WebListener
public class AppStarter implements ServletContextListener {

    @Resource
    private UserTransaction utx = null;

    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        Logger.getLogger(this.getClass().getName()).info("*** Initializing U.S Application... *** ");
        try {
            inicializar();
        } catch (Exception ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        Logger.getLogger(this.getClass().getName()).info("*** contextDestroyed - Stopping U.S-Quartz Scheluder ***");
//        try {
//            HelpDeskScheluder.stop();
//            PopImapEmailClientImpl.getExecutorService().shutdown();
//        } catch (SchedulerException ex) {
//            Logger.getLogger(AppStarter.class.getName()).log(Level.SEVERE, null, ex);
//        }
    }

    /**
     * we need to initialize many contexts now. One Context for each tenant.
     *
     * @throws SchedulerException
     */
    private void inicializar() /*throws SchedulerException*/ {

        verificarReservationStatus();
        verificarSpaceStatus();
        verificarCancelationPolicies();

    }
    
    
    private void verificarCancelationPolicies() {

        try {
            utx.begin();
            for (CancelationPolicy.CancelationPolicyEnum status : CancelationPolicy.CancelationPolicyEnum.values()) {
                CancelationPolicy s = em.find(CancelationPolicy.class, status.getCancelationPolicy().getId());
                if (s == null) {
                    em.persist(status.getCancelationPolicy());
                }
            }
            utx.commit();

        } catch (Exception ex) {
            Logger.getLogger(AppStarter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void verificarSpaceStatus() {

        try {
            utx.begin();
            for (SpaceStatus.EnumSpaceStatus status : SpaceStatus.EnumSpaceStatus.values()) {
                SpaceStatus s = em.find(SpaceStatus.class, status.getSpaceStatus().getId());
                if (s == null) {
                    em.persist(status.getSpaceStatus());
                }
            }
            utx.commit();

        } catch (Exception ex) {
            Logger.getLogger(AppStarter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void verificarReservationStatus() {

        try {
            utx.begin();
            for (ReservationStatus.EnumReservationStatus status : ReservationStatus.EnumReservationStatus.values()) {
                ReservationStatus s = em.find(ReservationStatus.class, status.getReservationStatus().getId());
                if (s == null) {
                    em.persist(status.getReservationStatus());
                }
            }
            utx.commit();

        } catch (Exception ex) {
            Logger.getLogger(AppStarter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
