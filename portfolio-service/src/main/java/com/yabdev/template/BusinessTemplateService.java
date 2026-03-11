// src/main/java/com/yabdev/template/BusinessTemplateService.java
package com.yabdev.template;

import com.yabdev.global.exception.EntityNotFoundException;
import com.yabdev.template.dto.BusinessTemplateRequest;
import com.yabdev.template.dto.BusinessTemplateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BusinessTemplateService {
    
    private final BusinessTemplateRepository businessTemplateRepository;
    private final BusinessTemplateMapper businessTemplateMapper;

    @Transactional(readOnly = true)
    public List<BusinessTemplateResponse> getAllActiveTemplates() {
        log.debug("Fetching all active business templates");
        return businessTemplateRepository.findByIsActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(businessTemplateMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BusinessTemplateResponse getTemplateById(Long id) {
        log.debug("Fetching business template by id: {}", id);
        BusinessTemplate template = businessTemplateRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Business template not found with id: " + id));
        return businessTemplateMapper.toResponse(template);
    }

    public BusinessTemplateResponse createTemplate(BusinessTemplateRequest businessTemplateRequest) {
        log.info("Creating new business template: {}", businessTemplateRequest.getTitle());
        BusinessTemplate template = businessTemplateMapper.toEntity(businessTemplateRequest);
        BusinessTemplate savedTemplate = businessTemplateRepository.save(template);
        return businessTemplateMapper.toResponse(savedTemplate);
    }

    public BusinessTemplateResponse updateTemplate(Long id, BusinessTemplateRequest businessTemplateRequest) {
        log.info("Updating business template with id: {}", id);
        BusinessTemplate template = businessTemplateRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Business template not found with id: " + id));
        
        businessTemplateMapper.updateEntity(businessTemplateRequest, template);
        BusinessTemplate updatedTemplate = businessTemplateRepository.save(template);
        return businessTemplateMapper.toResponse(updatedTemplate);
    }

    public void deleteTemplate(Long id) {
        log.info("Soft deleting business template with id: {}", id);
        BusinessTemplate template = businessTemplateRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new EntityNotFoundException("Business template not found with id: " + id));
        template.setIsActive(false);
        businessTemplateRepository.save(template);
    }

    @Transactional
    public void logInquiry(Long templateId) {
        log.info("Logging inquiry for template id: {}", templateId);
        businessTemplateRepository.incrementInquiryCount(templateId);
    }
}
