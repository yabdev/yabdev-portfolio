// src/main/java/com/yabdev/payment/dto/InitializePaymentRequest.java
package com.yabdev.payment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InitializePaymentRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Service name is required")
    private String serviceName;

    @NotNull(message = "Amount is required")
    @Min(value = 100, message = "Minimum amount is ₦100")
    private Long amount; // amount in Naira — will be converted to kobo in service
}
