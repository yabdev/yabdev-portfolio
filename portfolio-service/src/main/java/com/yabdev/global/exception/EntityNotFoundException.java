// src/main/java/com/yabdev/global/exception/EntityNotFoundException.java
package com.yabdev.global.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String message) {
        super(message);
    }
}
