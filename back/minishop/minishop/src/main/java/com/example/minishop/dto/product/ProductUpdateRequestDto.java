package com.example.minishop.dto.product;

import lombok.Data;

@Data
public class ProductUpdateRequestDto {

    private String name;
    private int price;
    private int stockQuantity;
    private String description;
    private String imageUrl;

}
