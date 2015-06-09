package com.unlockspaces.interceptors;

import com.auth0.Auth0User;
import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.Enumeration;
import javax.servlet.http.HttpServletResponse;
//import com.sun.jersey.api.client.Client;
//import com.sun.jersey.api.client.ClientResponse;
//import com.sun.jersey.api.client.WebResource;

@WebFilter(filterName = "jwt-filter", urlPatterns = {"/api/*, /persistence/*"})
public class JWTFilter implements Filter {

    public static final String AUTH0_CLIENT_SECRET = "14ykPsAXCrLeac3kWDp9ibpyFzda-yYxl5aKLlrl1QQqxBa5PLzMWKzIvYFtiOE3";
    public static final String AUTH0_CLIENT_ID = "8e3elusXRGQ8Jp2vv0i3T8B3KcW4zWeG";

    private JWTVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        jwtVerifier = new JWTVerifier(
                new Base64(true).decodeBase64(JWTFilter.AUTH0_CLIENT_SECRET),
                JWTFilter.AUTH0_CLIENT_ID);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

//        Enumeration headerNames = req.getHeaderNames();
//        while (headerNames.hasMoreElements()) {
//            String headerName = (String) headerNames.nextElement();
//            System.out.print(headerName + ":");
//            System.out.println("" + req.getHeader(headerName));
//        }
//        String path = ((HttpServletRequest) request).getRequestURI();

//        res.setHeader("Access-Control-Allow-Origin", "*");
//        res.setHeader("Access-Control-Allow-Credentials", "true");
//        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
//        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, authorization, apiKey, token" );
        // IMPORTANT!!! First, Acknowledge any pre-flight test from browsers for this case before validating the headers (CORS stuff)
        if (req.getMethod().equals("OPTIONS")) {
            res.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        try {
            String token = getToken((HttpServletRequest) request);
            Map<String, Object> decoded = jwtVerifier.verify(token);
            // Do something with decoded information like UserId
            System.out.println("decoded: " + decoded);
            System.out.println("User:" + Auth0User.get((HttpServletRequest) request));


            /**
             * Keeping User Data on your Application
             *
             * When outsourcing user authentication there is no more a
             * Users/Passwords table, but you will still want to associate
             * application data to the authenticated user. You can have a Users
             * table, that would have a copy of each user coming from Auth0,
             * without passwords of course. Every time a users logs in, you
             * would search that user if it does not exist, insert it, if it
             * does, update all the fields, essentially keeping a local copy of
             * the user data. Another option would be to have the user
             * identifier on each table/collection that has user-associated
             * data. For smaller applications, that would be easier to
             * implement.
             *
             * But the next question is, how do you uniquely identify a user
             * coming from Auth0? There are two options:
             *
             * Using the user_id property which is unique per user per identity
             * provider. Using the email property. In this case it's very
             * important to turn on Email Verification and also check that
             * email_verified is true, otherwise you would be open to some edge
             * case where a user might signup using an identity provider that
             * provides email but it doesn't verify it. Also, in some cases like
             * Twitter, email is not provided.
             */
        } catch (NoAuthorizationException | NoSuchAlgorithmException | InvalidKeyException |
                IllegalStateException | IOException | SignatureException | JWTVerifyException e) {
            System.out.println("Unauthorized because " + e.getClass().getName());
//            throw new ServletException("Unauthorized: Token validation failed", e);
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        chain.doFilter(request, response);
    }

    private String getToken(HttpServletRequest httpRequest) throws NoAuthorizationException {
        final String authorizationHeader = httpRequest.getHeader("authorization");
        System.out.println("authorization: " + authorizationHeader);
        return JWTFilter.getToken(authorizationHeader);
    }

    public static String getToken(String authorizationHeader) throws NoAuthorizationException {
        String token = null;
        if (authorizationHeader == null) {
            throw new NoAuthorizationException("Unauthorized: No Authorization header was found");
        }

        String[] parts = authorizationHeader.split(" ");
        if (parts.length != 2) {
            throw new NoAuthorizationException("Unauthorized: Format is Authorization: Bearer [token]");
        }

        String scheme = parts[0];
        String credentials = parts[1];

        Pattern pattern = Pattern.compile("^Bearer$", Pattern.CASE_INSENSITIVE);
        if (pattern.matcher(scheme).matches()) {
            token = credentials;
        }
        return token;
    }

    @Override
    public void destroy() {

    }

}
