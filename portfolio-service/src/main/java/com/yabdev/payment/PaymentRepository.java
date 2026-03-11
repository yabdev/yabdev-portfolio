// src/main/java/com/yabdev/payment/PaymentRepository.java
package com.yabdev.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByReference(String reference);

    Optional<Payment> findFirstByEmailAndServiceNameAndAmountAndCreatedAtAfterOrderByCreatedAtDesc(
            String email, String serviceName, Long amount, LocalDateTime since);
}
