package com.example.minishop.dto.product;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateRequestDto {

    private String name;
    private int price;
    private int stockQuantity;
    private String description;
    private String imageUrl;

}
