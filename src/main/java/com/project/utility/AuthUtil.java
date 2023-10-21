package com.project.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import javax.crypto.*;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Date;

public class AuthUtil {
    private static final String ISSUER_NAME = "koding";

    private static Algorithm algo = Algorithm.HMAC256("topsekret");
    private static JWTVerifier verifier = JWT.require(algo)
            .withIssuer(ISSUER_NAME)
            .withClaimPresence("username")
            .build();

    public static String getUser(String token) {
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
                .withIssuer(ISSUER_NAME)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .sign(algo);
    }

    public static boolean comparePasswordHash(String password, String hash) throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        String cipherText = hashPassword(password);
        return cipherText.equals(hash);
    }
    public static String hashPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        String salt = "123456789";
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 65536, 256);
        SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] cipherText = cipher.doFinal(password.getBytes());
        return Base64.getEncoder().encodeToString(cipherText);
    }

}
