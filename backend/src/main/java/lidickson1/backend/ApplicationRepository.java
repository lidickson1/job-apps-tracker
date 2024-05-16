package lidickson1.backend;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ApplicationRepository extends CrudRepository<Application, Integer> {
    List<Application> findAll(Pageable pageable);
    long count();
}