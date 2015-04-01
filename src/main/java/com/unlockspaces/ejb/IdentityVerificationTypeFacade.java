/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.ejb;

import com.unlockspaces.persistence.entities.IdentityVerificationType;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author jonathan
 */
@Stateless
public class IdentityVerificationTypeFacade extends AbstractFacade<IdentityVerificationType> {
    @PersistenceContext(unitName = "com.unlockspaces_UnlockServices_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public IdentityVerificationTypeFacade() {
        super(IdentityVerificationType.class);
    }
    
}
