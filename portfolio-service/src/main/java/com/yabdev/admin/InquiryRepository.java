// src/main/java/com/yabdev/admin/InquiryRepository.java
package com.yabdev.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.templateId = :templateId")
    long countByTemplateId(@Param("templateId") Long templateId);
}
