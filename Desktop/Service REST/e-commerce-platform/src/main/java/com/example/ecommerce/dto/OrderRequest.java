// src/main/java/com/example/ecommerce/dto/OrderRequest.java
package com.example.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    @NotNull(message = "Customer ID is required")
    private Long customerId;
    
    @NotEmpty(message = "Order items cannot be empty")
    private List<OrderItemRequest> orderItems; // ✅ Utilise la classe publique
    
    @NotNull(message = "Shipping address is required")
    private String shippingAddress;
    
    private String paymentMethod;
}