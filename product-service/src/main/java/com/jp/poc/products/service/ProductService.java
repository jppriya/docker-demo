package com.jp.poc.products.service;

import java.util.List;

import com.jp.poc.products.model.ProductDto;


public interface ProductService {

	/**
	 * @param productDto
	 */
	void saveProduct(ProductDto productDto);

	/**
	 * @param productId
	 * @param productName 
	 */
	void deleteProduct(String productId, String productName);

	/**
	 * @return
	 */
	List<ProductDto> getAllProducts();

	/**
	 * @param productId
	 * @param productName 
	 * @return
	 */
	ProductDto getProduct(String productId, String productName);

}
