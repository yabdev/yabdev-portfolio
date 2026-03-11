// src/main/java/com/yabdev/project/ProjectController.java
package com.yabdev.project;

import com.yabdev.global.dto.ApiResponse;
import com.yabdev.project.dto.ProjectRequest;
import com.yabdev.project.dto.ProjectResponse;
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
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    
    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        log.info("GET /api/projects - Fetching all projects");
        return ResponseEntity.ok(projectService.getAllActiveProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id) {
        log.info("GET /api/projects/{} - Fetching project", id);
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody ProjectRequest projectRequest) {
        log.info("POST /api/projects - Creating new project");
        ProjectResponse project = projectService.createProject(projectRequest);
        return ResponseEntity.created(URI.create("/api/projects/" + project.getId())).body(project);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest projectRequest) {
        log.info("PUT /api/projects/{} - Updating project", id);
        return ResponseEntity.ok(projectService.updateProject(id, projectRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteProject(@PathVariable Long id) {
        log.info("DELETE /api/projects/{} - Deleting project", id);
        projectService.deleteProject(id);
        return ResponseEntity.ok(new ApiResponse("Project deleted successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProjectResponse>> searchProjects(@RequestParam String q) {
        log.info("GET /api/projects/search?q={} - Searching projects", q);
        return ResponseEntity.ok(projectService.searchProjects(q));
    }
}
