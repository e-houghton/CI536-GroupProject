package DatabaseClasses;
import jakarta.persistence.*;

public class tCust {
        // ======================================
        // =             Attributes             =
        // ======================================
        @Id
        @GeneratedValue (strategy = GenerationType.AUTO)
        private Long id;
        @Column(nullable = false)
        private String title;
        private Float price;
        @Column(length = 2000)
        private String description;
        private String isbn;
        private Integer nbOfPage;
        private Boolean illustrations;

        // ======================================
        // =            Constructors            =
        // ======================================

        public Book() {
        }

        public Book(String title, Float price, String description, String isbn, Integer nbOfPage, Boolean illustrations) {
            this.title = title;
            this.price = price;
            this.description = description;
            this.isbn = isbn;
            this.nbOfPage = nbOfPage;
            this.illustrations = illustrations;
        }
}
