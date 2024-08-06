package humber.ds.toursite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ToursiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToursiteApplication.class, args);
	}

}
