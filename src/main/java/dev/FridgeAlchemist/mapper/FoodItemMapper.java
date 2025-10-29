package dev.FridgeAlchemist.mapper;

import dev.FridgeAlchemist.controller.dto.FoodItemRequest;
import dev.FridgeAlchemist.controller.dto.FoodItemResponse;
import dev.FridgeAlchemist.entity.FoodItem;
import org.springframework.stereotype.Component;

@Component
public class FoodItemMapper {

    public FoodItem toEntity(FoodItemRequest request){
        return new FoodItem(request.id(), request.name(), request.quant(), request.category(), request.expiration());
    }

    public FoodItemResponse toResponse(FoodItem entity){
        return new FoodItemResponse(entity.getId(), entity.getName(), entity.getQuant(), entity.getCategory(),entity.getExpiration());
    }
}
