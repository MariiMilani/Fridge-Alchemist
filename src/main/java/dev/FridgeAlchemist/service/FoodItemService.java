package dev.FridgeAlchemist.service;

import dev.FridgeAlchemist.controller.dto.FoodItemRequest;
import dev.FridgeAlchemist.entity.FoodItem;
import dev.FridgeAlchemist.mapper.FoodItemMapper;
import dev.FridgeAlchemist.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository repository;

    @Autowired
    private FoodItemMapper mapper;


    public FoodItem save(FoodItemRequest newFood) {
        FoodItem newItem = mapper.toEntity(newFood);
        repository.insertFoodItem(newItem.getName(), newItem.getQuant(), newItem.getCategory().name(),newItem.getExpiration());
        return newItem;
    }

    public List<FoodItem> getAll() {
        return repository.findAll();
    }

    public Optional<FoodItem> getById(Long id) {
        return repository.findById(id);
    }

    public String delete(Long id) {
        FoodItem deletedFood = getById(id).orElse(null);

        if (deletedFood != null) {
            repository.deleteById(id);
            return deletedFood.getName();
        }

        return "Item não encontrado";
    }

    public FoodItem update(Long id, FoodItemRequest updatedItem) {
        FoodItem oldItem = getById(id).orElse(null);

        if (oldItem != null) {
            FoodItem newItem = new FoodItem(
                    oldItem.getId(),
                    updatedItem.name(),
                    updatedItem.quant(),
                    updatedItem.category(),
                    updatedItem.expiration()
            );

            repository.save(newItem);

            return newItem;
        }
        return null;
    }
}
