DROP DATABASE `ngames`;
CREATE DATABASE ngames CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER ngames@localhost IDENTIFIED BY ''; -- CHANGE PASSWORD !!
GRANT ALL PRIVILEGES ON ngames.* TO ngames@localhost;
use ngames;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(96) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(192) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `registration_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modification_date` datetime DEFAULT NULL,
  `last_connection` datetime DEFAULT NULL,
  `avatar_url` varchar(288) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`));

CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `banner` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editor` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `illustrator` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `themes` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nb_players` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_user1_idx` (`author_id`),
  CONSTRAINT `fk_event_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `release_date` datetime DEFAULT NULL,
  `revision_date` datetime DEFAULT NULL,
  `is_published` tinyint DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `picture_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` int NOT NULL,
  `game_id` INT,
  PRIMARY KEY (`id`),
  KEY `fk_news_user1_idx` (`author_id`),
  CONSTRAINT `fk_news_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`),
  KEY `fk_news_game1_idx` (`game_id`),
  CONSTRAINT `fk_news_game1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
);


CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revision_date` datetime DEFAULT NULL,
  `max_players` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_user1_idx` (`author_id`),
  CONSTRAINT `fk_group_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
);

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

CREATE TABLE `round` (
  `id` int NOT NULL AUTO_INCREMENT,
  `round_date` datetime NOT NULL,
  `place` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `revision_date` datetime DEFAULT NULL,
  `is_private` tinyint(1) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `game_id` int NOT NULL,
  `author_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_round_game1_idx` (`game_id`),
  KEY `fk_round_user1_idx` (`author_id`),
  KEY `fk_round_group1_idx` (`group_id`),
  CONSTRAINT `fk_round_game1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `fk_round_group1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `fk_round_user1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
);

