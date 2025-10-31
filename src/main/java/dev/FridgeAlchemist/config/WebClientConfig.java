package dev.FridgeAlchemist.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${gemini.url.api}")
    private String geminiUrlApi;

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder.baseUrl(geminiUrlApi).build();
    }
}
