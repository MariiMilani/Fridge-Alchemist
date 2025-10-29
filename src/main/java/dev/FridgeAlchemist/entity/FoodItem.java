package dev.FridgeAlchemist.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "food_item")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer quant;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "food_category")
    private FoodCategory category;

    private LocalDate expiration;
}
