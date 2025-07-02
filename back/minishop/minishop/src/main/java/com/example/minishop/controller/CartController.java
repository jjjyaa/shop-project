package com.example.minishop.controller;

import com.example.minishop.dto.cart.AddToCartRequestDto;
import com.example.minishop.dto.cart.CartItemQuantityUpdateRequestDto;
import com.example.minishop.dto.cart.CartResponseDto;
import com.example.minishop.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart/")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // 장바구니 상품 추가
    @PostMapping("/add")
    public void addToCart(@RequestBody AddToCartRequestDto requestDto) {
        cartService.addToCart(requestDto);
    }

    // 회원 장바구니 조회
    @GetMapping("/{memberId}")
    public CartResponseDto getCart(@PathVariable Long memberId) {
        return cartService.getCartByMemberId(memberId);
    }

    // 장바구니 수량 수정
    @PatchMapping("/update-quantity")
    public ResponseEntity<Void> updateCartItemQuantity(@RequestBody CartItemQuantityUpdateRequestDto requestDto) {
        cartService.updateCartItemQuantity(requestDto);
        return ResponseEntity.ok().build();
    }

    // 장바구니 삭제 기능
    @DeleteMapping("/cart/delete/{cartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return ResponseEntity.ok().build();
    }

}
