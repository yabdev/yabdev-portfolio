// src/main/java/com/yabdev/academic/AcademicPaperService.java
package com.yabdev.academic;

import com.yabdev.academic.dto.AcademicPaperRequest;
import com.yabdev.academic.dto.AcademicPaperResponse;
import com.yabdev.global.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AcademicPaperService {
    
    private final AcademicPaperRepository academicPaperRepository;
    private final AcademicPaperMapper academicPaperMapper;

    @Transactional(readOnly = true)
    public List<AcademicPaperResponse> getAllActivePapers() {
        log.debug("Fetching all active academic papers");
        return academicPaperRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(academicPaperMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AcademicPaperResponse getPaperById(Long id) {
        log.debug("Fetching academic paper by id: {}", id);
        AcademicPaper academicPaper = academicPaperRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Academic paper not found with id: " + id));
        return academicPaperMapper.toResponse(academicPaper);
    }

    public AcademicPaperResponse createPaper(AcademicPaperRequest academicPaperRequest) {
        log.info("Creating new academic paper: {}", academicPaperRequest.getTitle());
        AcademicPaper academicPaper = academicPaperMapper.toEntity(academicPaperRequest);
        AcademicPaper savedPaper = academicPaperRepository.save(academicPaper);
        return academicPaperMapper.toResponse(savedPaper);
    }

    public AcademicPaperResponse updatePaper(Long id, AcademicPaperRequest academicPaperRequest) {
        log.info("Updating academic paper with id: {}", id);
        AcademicPaper academicPaper = academicPaperRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Academic paper not found with id: " + id));
        
        academicPaperMapper.updateEntity(academicPaperRequest, academicPaper);
        AcademicPaper updatedPaper = academicPaperRepository.save(academicPaper);
        return academicPaperMapper.toResponse(updatedPaper);
    }

    public void deletePaper(Long id) {
        log.info("Soft deleting academic paper with id: {}", id);
        AcademicPaper academicPaper = academicPaperRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Academic paper not found with id: " + id));
        academicPaper.setIsActive(false);
        academicPaperRepository.save(academicPaper);
    }

    @Transactional(readOnly = true)
    public List<AcademicPaperResponse> getPapersByTag(String tag) {
        log.debug("Fetching academic papers by tag: {}", tag);
        return academicPaperRepository.findByTag(tag)
                .stream()
                .map(academicPaperMapper::toResponse)
                .toList();
    }
}
