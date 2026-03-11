// src/main/java/com/yabdev/project/dto/ProjectRequest.java
package com.yabdev.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;
    
    @Size(max = 1000, message = "Problem statement must not exceed 1000 characters")
    private String problemStatement;
    
    @Size(max = 2000, message = "Solution must not exceed 2000 characters")
    private String solution;
    
    @Size(max = 1000, message = "Impact must not exceed 1000 characters")
    private String impact;
    
    @Size(max = 1500, message = "Business results must not exceed 1500 characters")
    private String businessResults;
    
    private String imageUrl;
    private String projectUrl;
}
