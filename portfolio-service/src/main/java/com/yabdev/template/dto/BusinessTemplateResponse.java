// src/main/java/com/yabdev/template/dto/BusinessTemplateResponse.java
package com.yabdev.template.dto;

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
public class BusinessTemplateResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String liveUrl;
    private String category;
    private List<String> features;
    private Integer inquiryCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
