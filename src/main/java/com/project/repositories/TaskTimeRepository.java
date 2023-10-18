package com.project.repositories;

import com.project.models.Tasks;
import com.project.models.TasksTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskTimeRepository extends JpaRepository<TasksTime, Integer> {
}
