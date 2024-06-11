package com.jgm.tracer.service.impl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class PexelsService {

    @Value("${pexels.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public PexelsService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.pexels.com/v1").build();
    }

    public String getRandomImageURL() {
        Random random = new Random();
        String[] keywords = {"random", "motorbike", "car", "nature", "landscape", "abstract"}; // Palabras clave aleatorias
        String randomKeyword = keywords[random.nextInt(keywords.length)]; // Selección aleatoria de una palabra clave

        int maxPages = 10; // Establecer un límite máximo de páginas para evitar bucles infinitos

        for (int i = 1; i <= maxPages; i++) {
            int finalI = i;
            PexelsResponse response = this.webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search")
                            .queryParam("query", randomKeyword)
                            .queryParam("per_page", 1) // Obtener solo una foto por página
                            .queryParam("page", finalI)
                            .queryParam("size", "medium")
                            .build())
                    .header("Authorization", this.apiKey)
                    .retrieve()
                    .bodyToMono(PexelsResponse.class)
                    .block();

            if (response != null && !response.photos.isEmpty()) {
                // Si se encontraron fotos en esta página, selecciona una al azar y devuelve su URL
                int randomPhotoIndex = random.nextInt(response.photos.size());
                return response.photos.get(randomPhotoIndex).src.get("medium");
            }
        }

        // Si no se encontraron fotos después de intentar en varias páginas, devuelve null
        return null;
    }


    // Clase interna para mapear la respuesta de Pexels
    private static class PexelsResponse {
        public List<Photo> photos;

        private static class Photo {
            public Map<String, String> src;
        }
    }
}
