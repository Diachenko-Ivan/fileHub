package io.javaclasses.filehub.api.user;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Used for converting of password string to hash.
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
        checkNotNull(password);
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_FUNCTION);
            BigInteger number = new BigInteger(1, digest.digest(password.getBytes()));

            return number.toString(16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
