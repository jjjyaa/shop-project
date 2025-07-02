package com.example.minishop.repository;

import com.example.minishop.entity.Order;
import com.example.minishop.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 회원 기반 주문 목록 조회
    List<Order> findByMember(Member member);
}
