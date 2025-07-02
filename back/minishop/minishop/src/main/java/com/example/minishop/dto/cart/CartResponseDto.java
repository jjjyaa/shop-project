package com.example.minishop.dto.cart;

import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDto {
    private Long cartId;
    private Long memberId;
    private List<CartItemResponseDto> items;

}
