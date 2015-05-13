/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.ejb;

import com.unlockspaces.persistence.entities.Invoice;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author jonathan
 */
@Stateless
public class InvoiceFacade extends AbstractFacade<Invoice> {
    @PersistenceContext(unitName = "unlockspaces")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public InvoiceFacade() {
        super(Invoice.class);
    }
    
}
