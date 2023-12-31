drop table if exists tasks cascade;
drop table if exists test_case cascade;
drop table if exists users cascade;
drop table if exists tasks_time cascade;
create table if not exists TASKS(
    ID  INTEGER auto_increment primary key,
    NAME CHARACTER VARYING(200) not null,
    SHORTDESC CHARACTER VARYING(300) not null,
    DESCRIPTION CHARACTER VARYING(500) not null,
    POINTS INTEGER not null
);

create table if not exists TEST_CASE(
    TASK_ID INTEGER not null references TASKS,
    INPUT CHARACTER VARYING(2000) not null,
    OUTPUT CHARACTER VARYING(2000) not null,
    ID INTEGER not null,
    constraint "TEST_CASE_pk" primary key (ID)
);

create table if not exists USERS(
    USERNAME CHARACTER VARYING(200) not null primary key,
    PASSWORD CHARACTER VARYING(200) not null
);

create table if not exists TASKS_TIME(
    USERNAME CHARACTER VARYING(200) not null references USERS,
    TASK_ID INTEGER not null references TASKS,
    FINISH_TIME TIMESTAMP not null,
    ID INTEGER auto_increment not null,
    constraint "TASKS_TIME_pk" primary key (ID)
);