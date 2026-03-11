// src/main/java/com/yabdev/template/BusinessTemplateController.java
package com.yabdev.template;

import com.yabdev.global.dto.ApiResponse;
import com.yabdev.template.dto.BusinessTemplateRequest;
import com.yabdev.template.dto.BusinessTemplateResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class BusinessTemplateController {
    
    private final BusinessTemplateService businessTemplateService;

    @GetMapping
    public ResponseEntity<List<BusinessTemplateResponse>> getAllTemplates() {
        log.info("GET /api/templates - Fetching all templates");
        return ResponseEntity.ok(businessTemplateService.getAllActiveTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessTemplateResponse> getTemplateById(@PathVariable Long id) {
        log.info("GET /api/templates/{} - Fetching template", id);
        return ResponseEntity.ok(businessTemplateService.getTemplateById(id));
    }

    @PostMapping("/{id}/inquire")
    public ResponseEntity<ApiResponse> logInquiry(@PathVariable Long id) {
        log.info("POST /api/templates/{}/inquire - Logging inquiry", id);
        businessTemplateService.logInquiry(id);
        return ResponseEntity.ok(new ApiResponse("Inquiry logged successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusinessTemplateResponse> createTemplate(@Valid @RequestBody BusinessTemplateRequest businessTemplateRequest) {
        log.info("POST /api/templates - Creating new template");
        BusinessTemplateResponse template = businessTemplateService.createTemplate(businessTemplateRequest);
        return ResponseEntity.created(URI.create("/api/templates/" + template.getId())).body(template);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BusinessTemplateResponse> updateTemplate(@PathVariable Long id, @Valid @RequestBody BusinessTemplateRequest businessTemplateRequest) {
        log.info("PUT /api/templates/{} - Updating template", id);
        return ResponseEntity.ok(businessTemplateService.updateTemplate(id, businessTemplateRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteTemplate(@PathVariable Long id) {
        log.info("DELETE /api/templates/{} - Deleting template", id);
        businessTemplateService.deleteTemplate(id);
        return ResponseEntity.ok(new ApiResponse("Template deleted successfully"));
    }
}
