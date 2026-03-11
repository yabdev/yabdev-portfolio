// src/main/java/com/yabdev/payment/PaymentController.java
package com.yabdev.payment;

import com.yabdev.payment.dto.InitializePaymentRequest;
import com.yabdev.payment.dto.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // We only allow callbacks to our known frontend domains to prevent Open
    // Redirect/SSRF
    private static final List<String> ALLOWED_ORIGINS = Arrays.asList(
            "http://localhost:3000",
            "https://yabbydev.com",
            "https://www.yabbydev.com");

    @PostMapping("/initialize")
    public ResponseEntity<PaymentResponse> initializePayment(
            @Valid @RequestBody InitializePaymentRequest request,
            HttpServletRequest httpRequest) {
        log.info("POST /api/payments/initialize - Initializing payment for service: {}", request.getServiceName());

        // Build the callback URL dynamically from the request origin, but sanitize and
        // validate it
        String origin = httpRequest.getHeader("Origin");
        if (origin == null || origin.isEmpty()) {
            origin = httpRequest.getHeader("Referer");
            if (origin != null && origin.startsWith("http")) {
                int pathIndex = origin.indexOf("/", origin.indexOf("//") + 2);
                if (pathIndex > 0) {
                    origin = origin.substring(0, pathIndex);
                }
            }
        }

        // Validate origin against whitelist
        if (origin == null || !ALLOWED_ORIGINS.contains(origin)) {
            log.warn("Invalid or missing origin detected: {}. Defaulting to canonical.", origin);
            // Default to production domain if valid one isn't found
            String reactAppUrl = System.getenv("REACT_APP_URL");
            origin = reactAppUrl != null ? reactAppUrl : "https://yabbydev.com";
        }

        String callbackUrl = origin + "/services/callback";

        PaymentResponse response = paymentService.initializePayment(request, callbackUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify/{reference}")
    public ResponseEntity<PaymentResponse> verifyPayment(@PathVariable String reference) {
        log.info("GET /api/payments/verify/{} - Verifying payment", reference);
        PaymentResponse response = paymentService.verifyPayment(reference);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {
        log.info("GET /api/payments/admin - Fetching all payments");
        return ResponseEntity.ok(paymentService.getAllPayments());
    }
}
