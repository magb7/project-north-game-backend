CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER your_user_name@localhost IDENTIFIED BY 'your_passworld';
GRANT ALL PRIVILEGES ON your_database_name.* TO your_user_name@localhost;
use your_database_name;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` datetime DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `revision_date` datetime DEFAULT NULL,
  `is_published` tinyint(4) DEFAULT NULL,
  `author` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` text,
  `picture_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_date` datetime NOT NULL,
  `adress` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `release_date` datetime DEFAULT NULL,
  `event_latitude` float NOT NULL,
  `event_longitude` float NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `round` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int DEFAULT NULL,
  `round_date` datetime NOT NULL,
  `place` varchar(100) DEFAULT NULL,
  `author_id` varchar(45) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `max_players` int NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revision_date` datetime DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `user_rounder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `round_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_round_user_idx` (`user_id`),
  KEY `fk_user_round_round1_idx` (`round_id`),
  CONSTRAINT `fk_user_round_round1` FOREIGN KEY (`round_id`) REFERENCES `round` (`id`),
  CONSTRAINT `fk_user_round_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`));

  CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `author_id` int NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revision_date` datetime DEFAULT NULL,
  `max_players` int NOT NULL,
  PRIMARY KEY (`id`));

 CREATE TABLE `user_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_group_user_idx` (`user_id`),
  KEY `fk_user_group_group1_idx` (`group_id`),
  CONSTRAINT `fk_user_group_group1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `fk_user_group_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(96) NOT NULL,
  `password` VARCHAR(192) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `modification_date` DATETIME NULL,
  `last_connection` DATETIME NULL,
  `avatar_url` VARCHAR(288) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE);

