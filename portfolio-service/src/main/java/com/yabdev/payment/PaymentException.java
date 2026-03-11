// src/main/java/com/yabdev/payment/PaymentException.java
package com.yabdev.payment;

import org.springframework.http.HttpStatus;

/**
 * Custom exception for payment-specific errors.
 * Provides HTTP status code and user-safe message.
 */
public class PaymentException extends RuntimeException {

    private final HttpStatus httpStatus;

    public PaymentException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public PaymentException(String message) {
        this(message, HttpStatus.BAD_REQUEST);
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
