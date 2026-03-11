// src/main/java/com/yabdev/admin/AdminController.java
package com.yabdev.admin;

import com.yabdev.admin.dto.AdminStatsResponse;
import com.yabdev.config.SupabaseStorageService;
import com.yabdev.global.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;
    private final SupabaseStorageService storageService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminStatsResponse> getDashboardStats() {
        log.info("Admin dashboard accessed");
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("POST /api/admin/upload - Uploading file: {}", file.getOriginalFilename());
        String fileUrl = storageService.uploadFile(file);
        return ResponseEntity.ok(Map.of("url", fileUrl));
    }
}
