package com.project.models;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "TASKS")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "NAME", nullable = false, length = 200)
    private String name;

    @Column(name = "SHORTDESC", nullable = false, length = 300)
    private String shortdesc;

    @Column(name = "DESCRIPTION", nullable = false, length = 300)
    private String description;

    @Column(name = "POINTS", nullable = false)
    private Integer points;

    @OneToMany(mappedBy = "task")
    private Set<TasksTime> tasksTimes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "task")
    private Set<TestCase> testCases = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortdesc() {
        return shortdesc;
    }

    public void setShortdesc(String shortdesc) {
        this.shortdesc = shortdesc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Set<TasksTime> getTasksTimes() {
        return tasksTimes;
    }

    public void setTasksTimes(Set<TasksTime> tasksTimes) {
        this.tasksTimes = tasksTimes;
    }

    public Set<TestCase> getTestCases() {
        return testCases;
    }

    public void setTestCases(Set<TestCase> testCases) {
        this.testCases = testCases;
    }

}