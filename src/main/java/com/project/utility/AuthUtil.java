package com.project.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Date;

public class AuthUtil {
    private static Algorithm algo = Algorithm.HMAC256("topsekret");

    public static String getUser(String token) {
        JWTVerifier verifier = JWT.require(algo)
                .withIssuer("koding")
                .withClaimPresence("username")
                .build();

        try {
            DecodedJWT decodedJWT = verifier.verify(token);

            return decodedJWT.getClaim("username").asString();
        } catch(JWTVerificationException e) {
            return null;
        }
    }

    public static String createToken(String username) {
         return JWT.create()
                .withClaim("username", username)
                .withIssuer("koding")
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .sign(algo);
    }

}
