// src/main/java/com/yabdev/academic/dto/AcademicPaperRequest.java
package com.yabdev.academic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcademicPaperRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;
    
    @Size(max = 2000, message = "Abstract must not exceed 2000 characters")
    private String abstractText;
    
    private String pdfUrl;
    
    private String thumbnailUrl;
    private List<String> tags;
}
