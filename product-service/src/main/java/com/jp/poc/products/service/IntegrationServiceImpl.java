package com.jp.poc.products.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.jp.poc.products.model.BookDTO;

@Service
public class IntegrationServiceImpl implements IntegrationService {

	@Autowired
	protected Environment environment;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public List<BookDTO> getAllBooks() {
		List<BookDTO> bookDTOs = new ArrayList<BookDTO>();
		try {
			HttpEntity<String> requestEntity = new HttpEntity<>(new HttpHeaders());
			ParameterizedTypeReference<List<BookDTO>> tyepRef = new ParameterizedTypeReference<List<BookDTO>>() {
			};
			ResponseEntity<List<BookDTO>> respEntity = restTemplate.exchange(
					environment.getProperty("integration.book.service.get.book.details.url"), HttpMethod.GET,
					requestEntity, tyepRef);
			if (null != respEntity) {
				bookDTOs = respEntity.getBody();
			}
		} catch (RestClientException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return bookDTOs;

	}

}
