package com.project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "TASKS_TIME")
public class TasksTime {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "USERNAME", nullable = false)
    @JsonBackReference
    private com.project.models.Users user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "TASK_ID", nullable = false)
    @JsonBackReference
    private com.project.models.Tasks task;

    @Column(name = "FINISH_TIME", nullable = false)
    private Instant finishTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public com.project.models.Users getUser() {
        return user;
    }

    public void setUser(com.project.models.Users user) {
        this.user = user;
    }

    public com.project.models.Tasks getTask() {
        return task;
    }

    public void setTask(com.project.models.Tasks task) {
        this.task = task;
    }

    public Instant getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Instant finishTime) {
        this.finishTime = finishTime;
    }

}