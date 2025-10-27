package dev.FridgeAlchemist.controller.dto;

import dev.FridgeAlchemist.entity.CategoryFood;

import java.time.LocalDateTime;

public record FoodItemRequest(Long id, String name, Integer quant, CategoryFood category, LocalDateTime expiration) {
}
