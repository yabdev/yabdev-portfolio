// src/main/java/com/yabdev/admin/dto/AdminStatsResponse.java
package com.yabdev.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {
    private int totalProjects;
    private int totalPapers;
    private int totalTemplates;
    private int totalInquiries;
}
