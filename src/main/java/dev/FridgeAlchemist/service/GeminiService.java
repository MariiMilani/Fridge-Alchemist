package dev.FridgeAlchemist.service;

import dev.FridgeAlchemist.entity.FoodItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    @Autowired
    private WebClient webClient;

    private final String apiKey = System.getenv("GEMINI_API_KEY");

    public Mono<String> generateRecipe(List<FoodItem> allItens) {

        String ingredients = allItens.stream()
                .map(FoodItem::getName)
                .collect(Collectors.joining(", "));

        String prompt = "Me sugira uma receita para fazer marmitas para a semana, com os seguinte ingredientes: " + ingredients;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of(
                                "role", "user",
                                "parts", List.of(
                                        Map.of("text", "Agora você é um chef de cozinha que cria receitas.")
                                )
                        ),
                        Map.of(
                                "role", "user",
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        return webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("x-goog-api-key", apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var candidates = (List<Map<String, Object>>) response.get("candidates");
                    if (candidates != null && !candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.getFirst().get("content");
                        var parts = (List<Map<String, Object>>) content.get("parts");

                        if (parts != null && !parts.isEmpty()) {
                            return parts.getFirst().get("text").toString();
                        }
                    }
                    return "Nenhuma receita foi gerada ou a resposta não pôde ser processada.";
                });
    }
}
