package com.example.minishop.controller;

import com.example.minishop.dto.order.OrderCreateRequestDto;
import com.example.minishop.dto.order.OrderResponseDto;
import com.example.minishop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 생성
    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderCreateRequestDto requestDto) {
        OrderResponseDto responseDto = orderService.createOrder(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // 회원별 주문 목록 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<OrderResponseDto>> getOrdersByMember(@PathVariable Long memberId) {
        List<OrderResponseDto> orders = orderService.getOrdersByMemberId(memberId);
        return ResponseEntity.ok(orders);
    }

    // 주문 상세 조회
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrderDetail(@PathVariable Long orderId) {
        OrderResponseDto responseDto = orderService.getOrderById(orderId);
        return ResponseEntity.ok(responseDto);
    }
}
