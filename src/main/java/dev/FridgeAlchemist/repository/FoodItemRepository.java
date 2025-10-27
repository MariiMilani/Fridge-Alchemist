package dev.FridgeAlchemist.repository;

import dev.FridgeAlchemist.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
}
