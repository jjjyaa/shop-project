package com.example.minishop.service.impl;

import com.example.minishop.dto.order.OrderCreateRequestDto;
import com.example.minishop.dto.order.OrderItemResponseDto;
import com.example.minishop.dto.order.OrderResponseDto;
import com.example.minishop.entity.*;
import com.example.minishop.repository.*;
import com.example.minishop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    // 주문 등록
    @Override
    public OrderResponseDto createOrder(OrderCreateRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // Order 엔티티 생성
        Order order = Order.builder()
                .member(member)
                .orderDate(LocalDateTime.now())
                .build();

        // OrderItem 리스트 생성
        List<OrderItem> orderItems = requestDto.getItems().stream()
                .map(itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

                    return OrderItem.builder()
                            .order(order)
                            .product(product)
                            .orderPrice(product.getPrice()) // 현재 상품 가격을 기록
                            .quantity(itemDto.getQuantity())
                            .build();
                }).collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // DB 저장
        Order savedOrder = orderRepository.save(order);

        // 결과 DTO 구성
        List<OrderItemResponseDto> itemDtos = savedOrder.getOrderItems().stream()
                .map(orderItem -> new OrderItemResponseDto(
                        orderItem.getId(),
                        orderItem.getProduct().getName(),
                        orderItem.getOrderPrice(),
                        orderItem.getQuantity()
                ))
                .collect(Collectors.toList());

        return new OrderResponseDto(savedOrder.getId(), member.getId(), savedOrder.getOrderDate(), itemDtos);
    }

    // 회원 기준 주문 목록 조회
    @Override
    public List<OrderResponseDto> getOrdersByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        List<Order> orders = orderRepository.findByMember(member);

        return orders.stream().map(order -> {
            List<OrderItemResponseDto> itemDtos = order.getOrderItems().stream()
                    .map(orderItem -> new OrderItemResponseDto(
                            orderItem.getProduct().getId(),
                            orderItem.getProduct().getName(),
                            orderItem.getOrderPrice(),
                            orderItem.getQuantity()
                    ))
                    .collect(Collectors.toList());

            return new OrderResponseDto(order.getId(), member.getId(), order.getOrderDate(), itemDtos);
        }).collect(Collectors.toList());
    }

    // 주문 상세 조회
    @Override
    public OrderResponseDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문이 존재하지 않습니다."));

        Member member = order.getMember();

        List<OrderItemResponseDto> itemDtos = order.getOrderItems().stream()
                .map(item -> new OrderItemResponseDto(
                        item.getId(),
                        item.getProduct().getName(),
                        item.getOrderPrice(),
                        item.getQuantity()
                ))
                .toList();

        return new OrderResponseDto(order.getId(), member.getId(), order.getOrderDate(), itemDtos);
    }
}
