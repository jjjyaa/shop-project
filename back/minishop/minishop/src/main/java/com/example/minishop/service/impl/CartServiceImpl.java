package com.example.minishop.service.impl;

import com.example.minishop.dto.cart.AddToCartRequestDto;
import com.example.minishop.dto.cart.CartItemQuantityUpdateRequestDto;
import com.example.minishop.dto.cart.CartItemResponseDto;
import com.example.minishop.dto.cart.CartResponseDto;
import com.example.minishop.entity.Cart;
import com.example.minishop.entity.CartItem;
import com.example.minishop.entity.Member;
import com.example.minishop.entity.Product;
import com.example.minishop.repository.CartItemRepository;
import com.example.minishop.repository.CartRepository;
import com.example.minishop.repository.MemberRepository;
import com.example.minishop.repository.ProductRepository;
import com.example.minishop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final CartItemRepository cartItemRepository;

    // 장바구니 상품 추가
    @Override
    public void addToCart(AddToCartRequestDto requestDto) {
        Product product = productRepository.findById(requestDto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // 장바구니 조회 (없으면 생성)
        Cart cart = cartRepository.findByMember(member).orElseGet(() -> {
            Cart newCart = Cart.builder()
                    .member(member)
                    .build();
            return cartRepository.save(newCart);
        });

        // 해당 상품이 이미 장바구니에 있는지 확인
        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // 이미 장바구니에 있는 상품이면 수량 증가
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + requestDto.getQuantity());
        } else {
            // 새로 추가
            CartItem newItem = CartItem.builder()
                    .product(product)
                    .cart(cart)
                    .quantity(requestDto.getQuantity())
                    .build();
            cart.getCartItems().add(newItem);
        }

        // 최종 저장
        cartRepository.save(cart);
    }

    // 특정 회원 장바구니 조회
    @Override
    public CartResponseDto getCartByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        Cart cart = cartRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("장바구니가 존재하지 않습니다."));

        // 장바구니 항목들을 가져와서 변환
        List<CartItemResponseDto> cartItemDtos = cart.getCartItems().stream()
                .map(cartItem -> new CartItemResponseDto(
                        cartItem.getId(),
                        cartItem.getProduct().getName(),
                        cartItem.getProduct().getPrice(),
                        cartItem.getQuantity()
                ))
                .toList();

        return new CartResponseDto(cart.getId(), member.getId(), cartItemDtos);
    }

    // 장바구니 수량 수정 기능
    @Override
    public void updateCartItemQuantity(CartItemQuantityUpdateRequestDto requestDto) {
        CartItem cartItem = cartItemRepository.findById(requestDto.getCartItemId())
                .orElseThrow(() -> new IllegalArgumentException("장바구니 항목이 존재하지 않습니다."));

        cartItem.setQuantity(requestDto.getQuantity());

        cartItemRepository.save(cartItem);
    }

    // 장바구니 삭제 기능
    @Override
    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 장바구니 항목이 존재하지 않습니다."));

        cartItemRepository.delete(cartItem);
    }

}
