// src/main/java/com/yabdev/config/RateLimitFilter.java
package com.yabdev.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple token-bucket rate limiter for payment endpoints.
 * Limits to 10 requests per minute per IP on /api/payments/initialize.
 */
@Component
@Order(1)
public class RateLimitFilter implements Filter {

    private static final int MAX_REQUESTS = 10;
    private static final long WINDOW_MS = 60_000; // 1 minute

    private final Map<String, RateBucket> buckets = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        String path = httpReq.getRequestURI();

        // Only rate-limit payment initialization
        if ("/api/payments/initialize".equals(path) && "POST".equalsIgnoreCase(httpReq.getMethod())) {
            String clientIp = getClientIp(httpReq);
            RateBucket bucket = buckets.compute(clientIp, (ip, existing) -> {
                long now = System.currentTimeMillis();
                if (existing == null || now - existing.windowStart > WINDOW_MS) {
                    return new RateBucket(now, new AtomicInteger(1));
                }
                existing.count.incrementAndGet();
                return existing;
            });

            if (bucket.count.get() > MAX_REQUESTS) {
                HttpServletResponse httpResp = (HttpServletResponse) response;
                httpResp.setStatus(429);
                httpResp.setContentType("application/json");
                httpResp.getWriter().write("{\"error\":\"Too many requests. Please try again later.\"}");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isEmpty()) {
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static class RateBucket {
        final long windowStart;
        final AtomicInteger count;

        RateBucket(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
