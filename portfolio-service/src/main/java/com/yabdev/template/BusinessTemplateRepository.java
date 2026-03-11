// src/main/java/com/yabdev/template/BusinessTemplateRepository.java
package com.yabdev.template;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinessTemplateRepository extends JpaRepository<BusinessTemplate, Long> {
    
    List<BusinessTemplate> findByIsActiveTrueOrderByCreatedAtDesc();
    long countByIsActiveTrue();
    Optional<BusinessTemplate> findByIdAndIsActiveTrue(Long id);
    
    @Modifying
    @Query("UPDATE BusinessTemplate bt SET bt.inquiryCount = bt.inquiryCount + 1 WHERE bt.id = :templateId")
    void incrementInquiryCount(@Param("templateId") Long templateId);
}
