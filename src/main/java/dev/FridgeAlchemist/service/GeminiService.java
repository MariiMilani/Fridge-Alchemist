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
                                        Map.of("text", "Agora você é um chef de cozinha que cria receitas, seja prático e focado, quero apenas as receitas para a marmita.")
                                )
                        ),
                        Map.of(
                                "role", "user",
                                "parts", List.of(
                                        Map.of("text", prompt),
                                        Map.of("text", "Você não precisa utilizar todos os ingredientes, utilize apenas aqueles que façam sentido na receita"),
                                        Map.of("text","Importante: Aqui estão algumas regras para você fazer a resposta. " +
                                                "1- Use quebra de linhas normais (\\n)." +
                                                "2- Não use markdown, utilize apenas texto puro." +
                                                "3- Utilize caixa alta e negrito para títulos e sempre que houver um título, inicie com o titulo em uma nova linha. " +
                                                "4- Liste os ingredientes com hífens"+
                                                "5- Divida claramente em: NOME DA RECEITA, INGREDIENTES e MODO DE PREPARO"+
                                                "6- Numere os passo das receitas.")
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
