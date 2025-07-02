package com.example.minishop.dto.cart;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponseDto {
    private Long id;
    private String productName;
    private int price;
    private int quantity;

}

