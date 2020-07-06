CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER your_user_name@localhost IDENTIFIED BY 'your_passworld';
GRANT ALL PRIVILEGES ON your_database_name.* TO your_user_name@localhost;
use your_database_name;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
);