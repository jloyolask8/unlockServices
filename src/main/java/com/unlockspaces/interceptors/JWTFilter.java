package com.unlockspaces.interceptors;

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
import javax.servlet.http.HttpServletResponse;

@WebFilter(filterName = "jwt-filter", urlPatterns = {"/api/*, /persistence/*"})
public class JWTFilter implements Filter {

    private JWTVerifier jwtVerifier;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        jwtVerifier = new JWTVerifier(
                //          new Base64(true).decodeBase64(System.getenv("AUTH0_CLIENT_SECRET")),
                //          System.getenv("AUTH0_CLIENT_ID"));
                new Base64(true).decodeBase64("14ykPsAXCrLeac3kWDp9ibpyFzda-yYxl5aKLlrl1QQqxBa5PLzMWKzIvYFtiOE3"),
                "8e3elusXRGQ8Jp2vv0i3T8B3KcW4zWeG");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
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
            System.out.println("decoded_" + decoded);
            
        } catch (NoAuthorizationException | NoSuchAlgorithmException | InvalidKeyException | 
                IllegalStateException | IOException | SignatureException | JWTVerifyException e) {
            System.out.println("Unauthorized");
//            throw new ServletException("Unauthorized: Token validation failed", e);
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        
        chain.doFilter(request, response);
    }

    private String getToken(HttpServletRequest httpRequest) throws NoAuthorizationException {
        String token = null;
        final String authorizationHeader = httpRequest.getHeader("authorization");
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
