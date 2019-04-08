package com.jp.poc.products.service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.jp.poc.products.model.ProductDto;

@Service
public class ProductServiceImpl implements ProductService {

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
}
