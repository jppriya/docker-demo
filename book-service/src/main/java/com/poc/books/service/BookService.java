package com.poc.books.service;

import java.util.List;

import com.poc.products.model.BookDTO;

public interface BookService {

	/**
	 * @return
	 */
	List<BookDTO> getAllBooks();

	/**
	 * @param productId
	 * @param productName
	 * @return
	 */
	BookDTO getBook(String bookId, String bookName);

}
