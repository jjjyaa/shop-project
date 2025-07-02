package com.example.minishop.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemQuantityUpdateRequestDto {

    private Long cartItemId;
    private int quantity;

}
