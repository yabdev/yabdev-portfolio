// src/main/java/com/yabdev/project/dto/ProjectResponse.java
package com.yabdev.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String title;
    private String problemStatement;
    private String solution;
    private String impact;
    private String businessResults;
    private String imageUrl;
    private String projectUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
