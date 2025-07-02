package com.example.minishop.dto.cart;

import lombok.Data;

@Data
public class AddToCartRequestDto {

    private Long productId;
    private Integer quantity;
    private Long memberId;

}
