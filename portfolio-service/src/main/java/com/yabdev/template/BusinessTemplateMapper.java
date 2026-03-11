// src/main/java/com/yabdev/template/BusinessTemplateMapper.java
package com.yabdev.template;

import com.yabdev.template.dto.BusinessTemplateRequest;
import com.yabdev.template.dto.BusinessTemplateResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BusinessTemplateMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inquiryCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    BusinessTemplate toEntity(BusinessTemplateRequest businessTemplateRequest);

    BusinessTemplateResponse toResponse(BusinessTemplate businessTemplate);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inquiryCount", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    void updateEntity(BusinessTemplateRequest businessTemplateRequest,
            @MappingTarget BusinessTemplate businessTemplate);
}
