package io.javaclasses.filehub.api.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.nio.cs.UTF_8;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Used for converting of password string to hash.
 */
public class PasswordHasher {
    /**
     * For logging.
     */
    private static final Logger logger = LoggerFactory.getLogger(PasswordHasher.class);
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
    public synchronized static String hash(String password) {
        checkNotNull(password);
        try {
            MessageDigest digest = MessageDigest.getInstance(HASH_FUNCTION);
            BigInteger number = new BigInteger(1, digest.digest(password.getBytes(UTF_8.defaultCharset())));

            return number.toString(16);
        } catch (NoSuchAlgorithmException e) {
            if (logger.isErrorEnabled()) {
                logger.error("Hashing algorithm was not found.");
            }
        }
        return null;
    }
}
