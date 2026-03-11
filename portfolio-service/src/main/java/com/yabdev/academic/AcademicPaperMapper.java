// src/main/java/com/yabdev/academic/AcademicPaperMapper.java
package com.yabdev.academic;

import com.yabdev.academic.dto.AcademicPaperRequest;
import com.yabdev.academic.dto.AcademicPaperResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AcademicPaperMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    AcademicPaper toEntity(AcademicPaperRequest academicPaperRequest);

    AcademicPaperResponse toResponse(AcademicPaper academicPaper);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    void updateEntity(AcademicPaperRequest academicPaperRequest, @MappingTarget AcademicPaper academicPaper);
}
