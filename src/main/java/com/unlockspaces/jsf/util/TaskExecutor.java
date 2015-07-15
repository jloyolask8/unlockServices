/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.unlockspaces.jsf.util;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 *
 * @author jorge
 */
@WebListener
public class TaskExecutor implements ServletContextListener {

    private static ExecutorService executor;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        createExecutor();
        System.out.println("Executor service started!");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        executor.shutdown();
        System.out.println("Executor service shutdown!");
    }

    static void createExecutor() {
        executor = new ThreadPoolExecutor(1,15,100L,TimeUnit.MILLISECONDS,new LinkedBlockingQueue<Runnable>());
    }
    
    public static synchronized void submitTask(Runnable runnable) {
        if (executor == null) {
            createExecutor();
        }
        executor.submit(runnable);
    }
 
    public static synchronized Future<String> submitTask(Callable callable) {
        if (executor == null) {
            createExecutor();
        }
        return executor.submit(callable);
    }

}
