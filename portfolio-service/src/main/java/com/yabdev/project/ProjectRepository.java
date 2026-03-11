// src/main/java/com/yabdev/project/ProjectRepository.java
package com.yabdev.project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByIsActiveTrueOrderByCreatedAtDesc();
    long countByIsActiveTrue();
    Optional<Project> findByIdAndIsActiveTrue(Long id);
    
    @Query("SELECT p FROM Project p WHERE p.isActive = true " +
           "AND (LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.problemStatement) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Project> searchActiveProjects(@Param("query") String query);
}
