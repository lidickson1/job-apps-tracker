package lidickson1.backend;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name="APPLICATIONS")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column(nullable = false)
    public int company;

    @Column(nullable = false)
    public String position;

    public String location;
    public String job_type;
    @Column(nullable = false)
    public String status;
    @Column(name = "applied_date",nullable = false)
    public Timestamp appliedDate;
    @Column(name = "rejected_date")
    public Timestamp rejectedDate;
}
