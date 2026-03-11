package com.yabdev.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Slf4j
@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    @Value("${supabase.storage.bucket}")
    private String bucketName;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Uploads a file to Supabase Storage and returns the public URL.
     */
    public String uploadFile(MultipartFile file) {
        try {
            // Generate a unique filename to avoid collisions
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : "";
            String uniqueFilename = UUID.randomUUID() + extension;

            // Build the upload URL
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + uniqueFilename;

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + supabaseKey);
            headers.set("apikey", supabaseKey);
            headers.setContentType(MediaType.parseMediaType(
                    file.getContentType() != null ? file.getContentType() : "application/octet-stream"
            ));

            // Upload
            HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    uploadUrl, HttpMethod.POST, requestEntity, String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                // Return the public URL
                String publicUrl = supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + uniqueFilename;
                log.info("File uploaded successfully: {}", publicUrl);
                return publicUrl;
            } else {
                log.error("Failed to upload file. Status: {}", response.getStatusCode());
                throw new RuntimeException("Failed to upload file to Supabase Storage");
            }
        } catch (Exception e) {
            log.error("Error uploading file to Supabase Storage: {}", e.getMessage(), e);
            throw new RuntimeException("File upload failed: " + e.getMessage(), e);
        }
    }
}
