package dev.FridgeAlchemist.repository;

import dev.FridgeAlchemist.entity.FoodCategory;
import dev.FridgeAlchemist.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO food_item(name, quant, category, expiration)" +
    "VALUES (:name, :quant, CAST(:category as food_category), :expiration)", nativeQuery = true)
    void insertFoodItem(
            @Param("name") String name,
            @Param("quant") Integer quant,
            @Param("category") String category,
            @Param("expiration")LocalDate expiration
            );

    @Transactional
    @Modifying
    @Query(value = "UPDATE food_item SET name = :name, quant = :quant, category = CAST(:category as food_category), expiration = :expiration WHERE id = :id", nativeQuery = true)
    void updateFoodItem(
            @Param("id") Long id,
            @Param("name") String name,
            @Param("quant") Integer quant,
            @Param("category") String category,
            @Param("expiration") LocalDate expiration
    );


}
