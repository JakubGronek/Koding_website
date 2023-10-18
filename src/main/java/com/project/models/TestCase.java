package com.project.models;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "TEST_CASE")
public class TestCase {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "TASK_ID", nullable = false)
    private com.project.models.Tasks task;

    @Column(name = "INPUT", nullable = false)
    private Integer input;

    @Column(name = "OUTPUT", nullable = false)
    private Integer output;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public com.project.models.Tasks getTask() {
        return task;
    }

    public void setTask(com.project.models.Tasks task) {
        this.task = task;
    }

    public Integer getInput() {
        return input;
    }

    public void setInput(Integer input) {
        this.input = input;
    }

    public Integer getOutput() {
        return output;
    }

    public void setOutput(Integer output) {
        this.output = output;
    }

}