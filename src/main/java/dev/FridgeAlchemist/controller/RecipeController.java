package dev.FridgeAlchemist.controller;

import dev.FridgeAlchemist.entity.FoodItem;
import dev.FridgeAlchemist.service.FoodItemService;
import dev.FridgeAlchemist.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class RecipeController {

    @Autowired
    private GeminiService openAIService;

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping("/generate")
    public Mono<ResponseEntity<String>> generateRecipe() {
        List<FoodItem> allItens = foodItemService.getAll();

        return openAIService.generateRecipe(allItens)
                .map(recipe -> ResponseEntity.ok(recipe))
                .defaultIfEmpty(ResponseEntity.noContent().build());
    }
}
