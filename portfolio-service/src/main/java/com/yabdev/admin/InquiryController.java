package com.yabdev.admin;

import com.yabdev.admin.dto.StudentInquiryRequest;
import com.yabdev.global.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<ApiResponse> submitInquiry(@Valid @RequestBody StudentInquiryRequest request) {
        log.info("POST /api/inquiries - Student inquiry for template: {}", request.getTemplateId());
        adminService.logStudentInquiry(request);
        return ResponseEntity.ok(new ApiResponse("Inquiry submitted successfully"));
    }
}
