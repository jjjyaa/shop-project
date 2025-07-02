package com.example.minishop.dto.order;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateRequestDto {

    private Long memberId; // 주문자 ID

    private List<OrderItemRequestDto> items; // 주문할 장바구니 항목 ID 목록
}
