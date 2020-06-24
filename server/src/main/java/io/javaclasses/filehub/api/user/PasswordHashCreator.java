package io.javaclasses.filehub.api.user;

import com.google.common.base.Preconditions;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Used for converting of string to hash.
 */
public class PasswordHashCreator {
    /**
     * Name of hash function.
     */
    private static final String HASH_FUNCTION = "SHA-256";

    /**
     * Returns string hash using SHA-256 function.
     *
     * @param password string for hashing.
     * @return hashed string.
     */
    public static String hashedPassword(String password) {
        Preconditions.checkNotNull(password);
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_FUNCTION);
            BigInteger number = new BigInteger(1, digest.digest(password.getBytes()));

            return number.toString(16);
        } catch (NoSuchAlgorithmException ignored) {
        }
        return null;
    }
}
