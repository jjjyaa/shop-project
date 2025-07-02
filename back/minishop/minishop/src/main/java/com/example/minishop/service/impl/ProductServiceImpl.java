package com.example.minishop.service.impl;

import com.example.minishop.dto.product.ProductCreateRequestDto;
import com.example.minishop.dto.product.ProductResponseDto;
import com.example.minishop.dto.product.ProductUpdateRequestDto;
import com.example.minishop.entity.Product;
import com.example.minishop.repository.ProductRepository;
import com.example.minishop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    // 상품 등록
    @Override
    public Long createProduct(ProductCreateRequestDto requestDto) {
        Product product = Product.builder()
                .name(requestDto.getName())
                .price(requestDto.getPrice())
                .stockQuantity(requestDto.getStockQuantity())
                .description(requestDto.getDescription())
                .imageUrl(requestDto.getImageUrl())
                .build();
        return productRepository.save(product).getId();
    }

    // 상품 목록 전체 조회
    @Override
    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> ProductResponseDto.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .price(product.getPrice())
                        .stockQuantity(product.getStockQuantity())
                        .description(product.getDescription())
                        .imageUrl(product.getImageUrl())
                        .build()
                )
                .collect(Collectors.toList());
    }

    // 상품 상세 조회
    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. ID: " + id));

        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .build();
    }

    @Override
    public ProductResponseDto updateProduct(Long id, ProductUpdateRequestDto requestDto) {
        // 1. 상품 ID로 기존 상품 조회
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. ID: " + id));

        // 2. 내부 update 메서드로 필드 수정
        product.update(
                requestDto.getName(),
                requestDto.getPrice(),
                requestDto.getStockQuantity(),
                requestDto.getDescription(),
                requestDto.getImageUrl()
        );

        // 3. 응답용 DTO로 변환하여 반환
        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .build();
    }

    // 상품 삭제
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. ID: " + id));

        productRepository.delete(product);
    }
}
