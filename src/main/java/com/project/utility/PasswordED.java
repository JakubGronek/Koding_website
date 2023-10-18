package com.project.utility;

import com.project.utility.AesUtil;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public class PasswordED {
    private final String salt = "123456789";

    public boolean compare(String password, String hash) throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        SecretKey key = AesUtil.getKeyFromPassword(password, salt);
        String cipherText = AesUtil.encrypt(password, key);
        return cipherText.equals(hash);
    }
    public String encrypt(String password) throws NoSuchAlgorithmException, InvalidKeySpecException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        SecretKey key = AesUtil.getKeyFromPassword(password, salt);
        return AesUtil.encrypt(password, key);
    }
}
