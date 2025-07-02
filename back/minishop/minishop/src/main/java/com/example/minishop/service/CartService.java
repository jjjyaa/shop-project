package com.example.minishop.service;

import com.example.minishop.dto.cart.AddToCartRequestDto;
import com.example.minishop.dto.cart.CartItemQuantityUpdateRequestDto;
import com.example.minishop.dto.cart.CartResponseDto;

public interface CartService {

    // 장바구니 상품 추가
    public void addToCart(AddToCartRequestDto requestDto);

    // 특정 회원 장바구니 조회
    public CartResponseDto getCartByMemberId(Long memberId);

    // 장바구니 수량 수정 기능
    public void updateCartItemQuantity(CartItemQuantityUpdateRequestDto requestDto);

    // 장바구니 삭제 기능
    public void deleteCartItem(Long cartItemId);
}


