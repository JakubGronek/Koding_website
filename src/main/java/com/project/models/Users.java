package com.project.models;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class Users {
    @Id
    @Column(name = "USERNAME", nullable = false, length = 200)
    private String username;

    @Column(name = "PASSWORD", nullable = false, length = 200)
    private String password;

    @OneToMany(mappedBy = "username")
    private Set<TasksTime> tasksTimes = new LinkedHashSet<>();

    public Users() {
    }

    public Users(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<TasksTime> getTasksTimes() {
        return tasksTimes;
    }

    public void setTasksTimes(Set<TasksTime> tasksTimes) {
        this.tasksTimes = tasksTimes;
    }

}