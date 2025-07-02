package com.example.minishop.dto.product;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDto {

    private Long id;
    private String name;
    private int price;
    private int stockQuantity;
    private String description;
    private String imageUrl;

}
