package com.jp.poc.products.service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.jp.poc.products.model.BookDTO;
import com.jp.poc.products.model.ProductDto;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private IntegrationService integrationService;

	@Override
	public void saveProduct(ProductDto productDto) {
		if (null != productDto) {
		}
	}

	@Override
	public void deleteProduct(String productId, String productName) {

	}

	@Override
	public List<ProductDto> getAllProducts() {

		List<ProductDto> product = getRequestListFromJson("product.json", ProductDto.class);
		return product;
	}

	@Override
	public ProductDto getProduct(String productId, String productName) {

		return null;
	}

	public static String readClasspathResource(String path) {

		String content = null;
		try {
			content = IOUtils.toString(ResourceUtils.getURL("classpath:" + path).openStream(),
					Charset.defaultCharset());
		} catch (IOException e) {
		}
		return content;
	}

	public static <T> List<T> getRequestListFromJson(String fileName, Class<T> typeClass) {
		ObjectMapper mapper = new ObjectMapper();
		List<T> listValue = null;

		try {
			listValue = mapper.readValue(Resources.toString(Resources.getResource(fileName), Charset.defaultCharset()),
					new TypeReference<List<T>>() {
					});
		} catch (Exception e) {
		}

		return listValue;
	}

	@Override
	public List<ProductDto> getAllBooks() {
		List<ProductDto> products = new ArrayList<>();
		ProductDto product = new ProductDto();
		List<BookDTO> books = integrationService.getAllBooks();
		// transform bookdto TO product dto

		if (CollectionUtils.isNotEmpty(books)) {
			for (BookDTO bookDto : books) {
				product = tranform(bookDto);
				products.add(product);
			}

		}
		return products;
	}

	private ProductDto tranform(BookDTO bookDto) {
		ProductDto productDto = new ProductDto();
		if (null != bookDto) {
			productDto.setProductId(bookDto.getBookId());
			productDto.setProductDesc(bookDto.getBookDescription());
			productDto.setProductCost(bookDto.getBookCost());
			productDto.setProductName(bookDto.getBookName());
		}
		return productDto;
	}
}
