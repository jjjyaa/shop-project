package com.example.minishop.service;

import com.example.minishop.dto.product.ProductCreateRequestDto;
import com.example.minishop.dto.product.ProductResponseDto;
import com.example.minishop.dto.product.ProductUpdateRequestDto;

import java.util.List;

public interface ProductService {

    // 상품 등록
    public Long createProduct(ProductCreateRequestDto requestDto);

    // 전체 상품 목록 조회
    public List<ProductResponseDto> getAllProducts();

    // 특정 상품 상세 조회
    public ProductResponseDto getProductById(Long id);

    // 상품 수정
    public ProductResponseDto updateProduct(Long id, ProductUpdateRequestDto requestDto);

    // 상품 삭제
    public void deleteProduct(Long id);
}

