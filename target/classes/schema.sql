CREATE TABLE IF NOT EXISTS `users`(
                        `username` varchar(200) not null primary key,
                        `password` varchar(200) not null
);
CREATE TABLE IF NOT EXISTS `tasks`(
                        `id` int not null AUTO_INCREMENT primary key,
                        `name` varchar(200) not null,
                        `description` varchar(300) not null
);
CREATE TABLE IF NOT EXISTS `tasks_time`(
                             `username` varchar(200) not null,
                             `task_id` int not null,
                             `finish_time` timestamp not null,
                             foreign key (username) references users(username),
                             foreign key (task_id) references tasks(id)
);
CREATE TABLE IF NOT EXISTS `test_case`(
                            `task_id` int not null,
                            `input` int not null,
                            `output` int not null,
                            foreign key (task_id) references tasks(id)
);