CREATE DATABASE your_database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER your_user_name@localhost IDENTIFIED BY 'your_passworld';
GRANT ALL PRIVILEGES ON your_database_name.* TO your_user_name@localhost;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;