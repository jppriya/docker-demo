package com.poc.books.controller;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.books.service.BookService;
import com.poc.products.model.BookDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(path = "/books")
@Api(value = "/books")
public class BookController {
	@Autowired
	private BookService bookService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value = "Get all active books")
	public ResponseEntity<List<BookDTO>> getAllBooks() {
		List<BookDTO> books = bookService.getAllBooks();
		if (CollectionUtils.isNotEmpty(books)) {
			return new ResponseEntity<>(books, HttpStatus.OK);
		}
		return null;
	}

	@GetMapping("/{productId}/{productName}")
	@ApiOperation(value = "Retrieve product", response = Void.class)
	public ResponseEntity<BookDTO> getProduct(@PathVariable("bookId") String bookId,
			@PathVariable("bookName") String bookName) {
		BookDTO product = bookService.getBook(bookId, bookName);
		if (null != product) {
			return new ResponseEntity<>(product, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
