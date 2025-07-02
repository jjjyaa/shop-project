package com.example.minishop.dto.order;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private Long orderId;
    private Long memberId;
    private LocalDateTime orderDate;

    private List<OrderItemResponseDto> orderItems;

}