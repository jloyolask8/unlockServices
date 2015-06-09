/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.interceptors;

/**
 *
 * @author jonathan
 */
public class NoAuthorizationException extends Exception {

    public NoAuthorizationException(String message) {
        super(message);
    }
    
}
