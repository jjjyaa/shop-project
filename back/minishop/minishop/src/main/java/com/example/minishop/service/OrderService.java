package com.example.minishop.service;

import com.example.minishop.dto.order.OrderCreateRequestDto;
import com.example.minishop.dto.order.OrderResponseDto;

import java.util.List;

public interface OrderService {
    // 주문 등록
    OrderResponseDto createOrder(OrderCreateRequestDto requestDto);

    // 회원 기준 주문 목록 조회
    List<OrderResponseDto> getOrdersByMemberId(Long memberId);

    // 주문 상세 조회
    OrderResponseDto getOrderById(Long orderId);
}
