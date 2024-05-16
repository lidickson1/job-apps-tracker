package lidickson1.backend;

import jakarta.persistence.*;

@Entity
@Table(name="COMPANIES")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @SequenceGenerator(name = "companies_SEQ", allocationSize = 1)
    public int id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String image;
}
