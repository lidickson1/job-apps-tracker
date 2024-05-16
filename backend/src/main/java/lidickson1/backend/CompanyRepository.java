package lidickson1.backend;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompanyRepository extends CrudRepository<Company, Integer> {
    List<Company> findByName(String name);
}