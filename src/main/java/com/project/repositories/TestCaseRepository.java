package com.project.repositories;

import com.project.models.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    Set<TestCase> findById(Integer id);
}
