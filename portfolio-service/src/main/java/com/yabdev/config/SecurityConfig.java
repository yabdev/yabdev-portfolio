// src/main/java/com/yabdev/config/SecurityConfig.java
package com.yabdev.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(csrf -> csrf.disable())
                                .headers(headers -> headers
                                                .contentSecurityPolicy(csp -> csp.policyDirectives(
                                                                "default-src 'self'; frame-ancestors 'none'; sandbox"))
                                                .frameOptions(frame -> frame.deny())
                                                .xssProtection(xss -> xss.disable()) // Disabled because CSP is used,
                                                                                     // but headers can be customized
                                                .addHeaderWriter(new StaticHeadersWriter("X-Content-Type-Options",
                                                                "nosniff"))
                                                .addHeaderWriter(new StaticHeadersWriter("Strict-Transport-Security",
                                                                "max-age=31536000; includeSubDomains; preload"))
                                                .addHeaderWriter(new StaticHeadersWriter("Referrer-Policy",
                                                                "strict-origin-when-cross-origin"))
                                                .addHeaderWriter(new StaticHeadersWriter("Permissions-Policy",
                                                                "geolocation=(), microphone=(), camera=()")))
                                .authorizeHttpRequests(authz -> authz
                                                .requestMatchers("/api/projects/**", "/api/academic/**",
                                                                "/api/templates/**",
                                                                "/api/inquiries/**", "/api/payments/initialize",
                                                                "/api/payments/verify/**")
                                                .permitAll()
                                                .requestMatchers("/api/admin/**", "/api/payments/admin").authenticated()
                                                .anyRequest().denyAll())
                                .httpBasic(basic -> {
                                });

                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService(
                        @org.springframework.beans.factory.annotation.Value("${admin.password}") String adminPassword) {
                UserDetails admin = User.builder()
                                .username("admin")
                                .password(passwordEncoder().encode(adminPassword))
                                .roles("ADMIN")
                                .build();
                return new InMemoryUserDetailsManager(admin);
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // Allowed origins
                String reactAppUrl = System.getenv("REACT_APP_URL");
                if (reactAppUrl != null) {
                        configuration.setAllowedOrigins(
                                        Arrays.asList(reactAppUrl, "https://yabbydev.com", "https://www.yabbydev.com",
                                                        "https://yabdev-portfolio.vercel.app"));
                } else {
                        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://yabbydev.com",
                                        "https://www.yabbydev.com", "https://yabdev-portfolio.vercel.app"));
                }

                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "Origin",
                                "X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
                configuration.setAllowCredentials(true);
                configuration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/api/**", configuration);
                return source;
        }
}
