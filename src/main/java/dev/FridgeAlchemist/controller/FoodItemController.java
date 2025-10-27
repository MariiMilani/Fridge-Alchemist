package dev.FridgeAlchemist.controller;

import dev.FridgeAlchemist.controller.dto.FoodItemRequest;
import dev.FridgeAlchemist.controller.dto.FoodItemResponse;
import dev.FridgeAlchemist.entity.FoodItem;
import dev.FridgeAlchemist.mapper.FoodItemMapper;
import dev.FridgeAlchemist.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodItemController {

    @Autowired
    private FoodItemService service;

    @Autowired
    private FoodItemMapper mapper;

    @PostMapping
    public ResponseEntity<FoodItemResponse> newItem(@RequestBody FoodItemRequest request) {
        FoodItem newItem = service.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(newItem));
    }

    @GetMapping
    public ResponseEntity<List<FoodItemResponse>> getAll() {
        List<FoodItem> allFoods = service.getAll();
        return ResponseEntity.ok(allFoods.stream().map(food -> mapper.toResponse(food)).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemResponse> getById(@PathVariable Long id) {
        FoodItem food = service.getById(id).orElse(null);
        return ResponseEntity.ok(mapper.toResponse(food));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        String deletedName = service.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(deletedName);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItemResponse> update(@PathVariable Long id, @RequestBody FoodItemRequest request) {
        FoodItem updatedItem = service.update(id, request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(mapper.toResponse(updatedItem));
    }
}
