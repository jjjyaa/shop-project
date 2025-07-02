package com.example.minishop.dto.order;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequestDto {

    private Long productId; // 주문할 상품 ID
    private int quantity;   // 주문 수량
}
