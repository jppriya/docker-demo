package com.poc.books.service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Resources;
import com.poc.products.model.BookDTO;

@Service
public class BookServiceImpl implements BookService {

	@Override
	public List<BookDTO> getAllBooks() {

		List<BookDTO> books = getRequestListFromJson("book.json", BookDTO.class);
		return books;
	}

	@Override
	public BookDTO getBook(String bookId, String bookName) {

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
