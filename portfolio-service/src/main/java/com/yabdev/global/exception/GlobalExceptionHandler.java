// src/main/java/com/yabdev/global/exception/GlobalExceptionHandler.java (Updated)
package com.yabdev.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.net.URI;
import java.time.Instant;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGenericException(Exception ex, WebRequest request) {
        log.error("Unhandled exception: {}", ex.getMessage(), ex);

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setDetail("An unexpected error occurred");
        problemDetail.setType(URI.create("https://yabbydev.com/errors/server-error"));
        problemDetail.setProperty("timestamp", Instant.now());
        problemDetail.setProperty("requestId", request.getDescription(false));

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleEntityNotFound(EntityNotFoundException ex, WebRequest request) {
        log.warn("Entity not found: {}", ex.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problemDetail.setTitle("Resource Not Found");
        problemDetail.setDetail(ex.getMessage());
        problemDetail.setType(URI.create("https://yabbydev.com/errors/not-found"));
        problemDetail.setProperty("timestamp", Instant.now());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidationErrors(MethodArgumentNotValidException ex,
            WebRequest request) {
        log.warn("Validation errors: {}", ex.getMessage());

        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problemDetail.setTitle("Validation Error");
        problemDetail.setDetail(errorMessage);
        problemDetail.setType(URI.create("https://yabbydev.com/errors/validation"));
        problemDetail.setProperty("timestamp", Instant.now());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problemDetail);
    }

    @ExceptionHandler(com.yabdev.payment.PaymentException.class)
    public ResponseEntity<ProblemDetail> handlePaymentException(com.yabdev.payment.PaymentException ex,
            WebRequest request) {
        log.warn("Payment error: {}", ex.getMessage());

        ProblemDetail problemDetail = ProblemDetail.forStatus(ex.getHttpStatus());
        problemDetail.setTitle("Payment Error");
        problemDetail.setDetail(ex.getMessage());
        problemDetail.setType(URI.create("https://yabbydev.com/errors/payment"));
        problemDetail.setProperty("timestamp", Instant.now());

        return ResponseEntity.status(ex.getHttpStatus()).body(problemDetail);
    }
}
