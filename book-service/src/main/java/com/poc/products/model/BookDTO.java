package com.poc.products.model;

import java.math.BigDecimal;

public class BookDTO {

	public String bookId;

	public String bookName;

	public String bookAuthor;

	public String bookDescription;

	public BigDecimal bookCost;

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	public String getBookDescription() {
		return bookDescription;
	}

	public void setBookDescription(String bookDescription) {
		this.bookDescription = bookDescription;
	}

	public BigDecimal getBookCost() {
		return bookCost;
	}

	public void setBookCost(BigDecimal bookCost) {
		this.bookCost = bookCost;
	}

}
