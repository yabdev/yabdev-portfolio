// src/main/java/com/yabdev/academic/AcademicPaperController.java
package com.yabdev.academic;

import com.yabdev.academic.dto.AcademicPaperRequest;
import com.yabdev.academic.dto.AcademicPaperResponse;
import com.yabdev.global.dto.ApiResponse;
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
@RequestMapping("/api/academic")
@RequiredArgsConstructor
public class AcademicPaperController {

    private final AcademicPaperService academicPaperService;

    @GetMapping
    public ResponseEntity<List<AcademicPaperResponse>> getAllPapers() {
        log.info("GET /api/academic - Fetching all academic papers");
        return ResponseEntity.ok(academicPaperService.getAllActivePapers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicPaperResponse> getPaperById(@PathVariable Long id) {
        log.info("GET /api/academic/{} - Fetching academic paper", id);
        return ResponseEntity.ok(academicPaperService.getPaperById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AcademicPaperResponse> createPaper(
            @Valid @RequestBody AcademicPaperRequest academicPaperRequest) {
        log.info("POST /api/academic - Creating new academic paper");
        AcademicPaperResponse paper = academicPaperService.createPaper(academicPaperRequest);
        return ResponseEntity.created(URI.create("/api/academic/" + paper.getId())).body(paper);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AcademicPaperResponse> updatePaper(@PathVariable Long id,
            @Valid @RequestBody AcademicPaperRequest academicPaperRequest) {
        log.info("PUT /api/academic/{} - Updating academic paper", id);
        return ResponseEntity.ok(academicPaperService.updatePaper(id, academicPaperRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deletePaper(@PathVariable Long id) {
        log.info("DELETE /api/academic/{} - Deleting academic paper", id);
        academicPaperService.deletePaper(id);
        return ResponseEntity.ok(new ApiResponse("Academic paper deleted successfully"));
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<AcademicPaperResponse>> getPapersByTag(@PathVariable String tag) {
        log.info("GET /api/academic/tag/{} - Fetching academic papers by tag", tag);
        return ResponseEntity.ok(academicPaperService.getPapersByTag(tag));
    }
}
