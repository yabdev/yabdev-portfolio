// src/main/java/com/yabdev/academic/dto/AcademicPaperResponse.java
package com.yabdev.academic.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcademicPaperResponse {
    private Long id;
    private String title;
    private String abstractText;
    private String pdfUrl;
    private String thumbnailUrl;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
