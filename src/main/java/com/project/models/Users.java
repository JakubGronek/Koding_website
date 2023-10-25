package com.project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
@NamedNativeQuery(
        name="scoreboard",
        query = "Select " +
                "users.username, sum(tasks.points) as points  " +
                "from users inner join tasks_time on users.username = tasks_time.username inner join tasks on tasks_time.task_id = tasks.id " +
                "group by users.username limit 25",
        resultSetMapping = "userPoints"
)
@SqlResultSetMapping(
        name = "userPoints",
        classes = @ConstructorResult(
                targetClass = UserPoints.class,
                columns = {
                        @ColumnResult(name = "username", type = String.class),
                        @ColumnResult(name = "points", type = Integer.class)
                }
        )
)
public class Users {
    @Id
    @Column(name = "USERNAME", nullable = false, length = 200)
    private String username;

    @Column(name = "PASSWORD", nullable = false, length = 200)
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<TasksTime> tasksTimes = new LinkedHashSet<>();

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Transient
    private int points;
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