// src/main/java/com/yabdev/admin/AdminService.java
package com.yabdev.admin;

import com.yabdev.academic.AcademicPaperRepository;
import com.yabdev.admin.dto.AdminStatsResponse;
import com.yabdev.admin.dto.StudentInquiryRequest;
import com.yabdev.project.ProjectRepository;
import com.yabdev.template.BusinessTemplateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final ProjectRepository projectRepository;
    private final AcademicPaperRepository academicPaperRepository;
    private final BusinessTemplateRepository businessTemplateRepository;
    private final InquiryRepository inquiryRepository;

    public AdminStatsResponse getDashboardStats() {
        log.debug("Generating admin dashboard statistics");
        
        long totalProjects = projectRepository.countByIsActiveTrue();
        long totalPapers = academicPaperRepository.countByIsActiveTrue();
        long totalTemplates = businessTemplateRepository.countByIsActiveTrue();
        long totalInquiries = inquiryRepository.count();
        
        return AdminStatsResponse.builder()
                .totalProjects((int) totalProjects)
                .totalPapers((int) totalPapers)
                .totalTemplates((int) totalTemplates)
                .totalInquiries((int) totalInquiries)
                .build();
    }

    public void logStudentInquiry(StudentInquiryRequest request) {
        log.info("Logging inquiry from: {} | Subject: {}", request.getName(), request.getSubject());

        Inquiry inquiry = Inquiry.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .templateId(request.getTemplateId())
                .build();

        inquiryRepository.save(inquiry);
        log.info("Inquiry saved with ID: {}", inquiry.getId());
    }
}
