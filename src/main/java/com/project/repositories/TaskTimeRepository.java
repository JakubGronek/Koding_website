package com.project.repositories;

import com.project.models.TasksTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskTimeRepository extends JpaRepository<TasksTime, Integer> {
}
