// src/main/java/com/yabdev/project/ProjectService.java
package com.yabdev.project;

import com.yabdev.global.exception.EntityNotFoundException;
import com.yabdev.project.dto.ProjectRequest;
import com.yabdev.project.dto.ProjectResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllActiveProjects() {
        log.debug("Fetching all active projects");
        return projectRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        log.debug("Fetching project by id: {}", id);
        Project project = projectRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
        return projectMapper.toResponse(project);
    }

    public ProjectResponse createProject(ProjectRequest projectRequest) {
        log.info("Creating new project: {}", projectRequest.getTitle());
        Project project = projectMapper.toEntity(projectRequest);
        Project savedProject = projectRepository.save(project);
        return projectMapper.toResponse(savedProject);
    }

    public ProjectResponse updateProject(Long id, ProjectRequest projectRequest) {
        log.info("Updating project with id: {}", id);
        Project project = projectRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
        
        projectMapper.updateEntity(projectRequest, project);
        Project updatedProject = projectRepository.save(project);
        return projectMapper.toResponse(updatedProject);
    }

    public void deleteProject(Long id) {
        log.info("Soft deleting project with id: {}", id);
        Project project = projectRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + id));
        project.setIsActive(false);
        projectRepository.save(project);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> searchProjects(String query) {
        log.debug("Searching projects with query: {}", query);
        return projectRepository.searchActiveProjects(query)
                .stream()
                .map(projectMapper::toResponse)
                .toList();
    }
}
