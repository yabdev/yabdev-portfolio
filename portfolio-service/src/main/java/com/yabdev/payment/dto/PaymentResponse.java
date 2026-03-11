// src/main/java/com/yabdev/payment/dto/PaymentResponse.java
package com.yabdev.payment.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {
    private Long id;
    private String reference;
    private String email;
    private String customerName;
    private String serviceName;
    private Long amount; // in Naira
    private String status;
    private String authorizationUrl; // only populated during initialization
    private LocalDateTime createdAt;
}
