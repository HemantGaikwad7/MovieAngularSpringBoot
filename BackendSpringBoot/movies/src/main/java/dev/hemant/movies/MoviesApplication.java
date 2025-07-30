package dev.hemant.movies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@EnableMongoRepositories(basePackages = "dev.hemant.movies")
public class MoviesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoviesApplication.class, args);
	}
	@GetMapping("/")
	public String apiRoot(){
		System.out.println("Hellow world");
		return "Hello World1";
	}
	@GetMapping("/root")
	public ResponseEntity<String> allMovies(){
		return new ResponseEntity<String>("All Movies!", HttpStatus.OK);
	}

}
