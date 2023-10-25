package com.project.repositories;

import com.project.models.UserPoints;
import com.project.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<Users, String> {
    @Query(nativeQuery = true, name = "scoreboard")
    List<UserPoints> getUsersPoints();
}
