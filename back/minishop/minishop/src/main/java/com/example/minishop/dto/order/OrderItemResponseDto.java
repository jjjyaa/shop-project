package com.example.minishop.dto.order;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponseDto {

    private Long productId;
    private String productName;
    private int orderPrice;
    private int quantity;
}