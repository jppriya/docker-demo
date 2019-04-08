package com.jp.poc.products.controller;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jp.poc.products.model.ProductDto;
import com.jp.poc.products.service.ProductService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(path = "/products")
@Api(value = "/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value = "Save product", response = Void.class)
	public void saveProduct(@RequestBody ProductDto productDto) {
		System.out.println("Save product!!!");
		System.out.println("Product Name" + productDto.getProductName());
		productService.saveProduct(productDto);
	}

	@DeleteMapping("/{productId}/{productName}")
	@ApiOperation(value = "Delete product", response = Void.class)
	public void deleteProduct(@PathVariable("productId") String productId,
			@PathVariable("productName") String productName) {
		productService.deleteProduct(productId, productName);
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value = "Get all active products")
	public ResponseEntity<List<ProductDto>> getAllProducts() {
		List<ProductDto> products = productService.getAllProducts();
		if (CollectionUtils.isNotEmpty(products)) {
			return new ResponseEntity<>(products, HttpStatus.OK);
		}
		return null;
	}

	@GetMapping("/{productId}/{productName}")
	@ApiOperation(value = "Retrieve product", response = Void.class)
	public ResponseEntity<ProductDto> getProduct(@PathVariable("productId") String productId,
			@PathVariable("productName") String productName) {
		ProductDto product = productService.getProduct(productId, productName);
		if (null != product) {
			return new ResponseEntity<>(product, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
