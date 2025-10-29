package dev.FridgeAlchemist.controller.dto;

import dev.FridgeAlchemist.entity.FoodCategory;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record FoodItemResponse(Long id, String name, Integer quant, FoodCategory category, LocalDate expiration) {
}
