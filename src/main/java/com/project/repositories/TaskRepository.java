package com.project.repositories;

import com.project.models.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Tasks,Long> {
    List<Tasks> findByNameContaining(String name);
}
