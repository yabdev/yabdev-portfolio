// src/main/java/com/yabdev/academic/AcademicPaperRepository.java
package com.yabdev.academic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcademicPaperRepository extends JpaRepository<AcademicPaper, Long> {
    
    List<AcademicPaper> findByIsActiveTrueOrderByCreatedAtDesc();
    long countByIsActiveTrue();
    Optional<AcademicPaper> findByIdAndIsActiveTrue(Long id);
    
    @Query("SELECT ap FROM AcademicPaper ap WHERE ap.isActive = true AND :tag MEMBER OF ap.tags")
    List<AcademicPaper> findByTag(@Param("tag") String tag);
}
