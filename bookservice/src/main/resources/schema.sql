# -- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
# --
# -- Host: localhost    Database: Auth_DB
# -- ------------------------------------------------------
# -- Server version	8.0.16
# CREATE DATABASE IF NOT EXISTS `Book_DB`;
# /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
# /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
# /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
#  SET NAMES utf8mb4 ;
# /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
# /*!40103 SET TIME_ZONE='+00:00' */;
# /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
# /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
# /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
# /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
# USE `Book_DB`;
#
# --
# -- Table structure for table `Author`
# --
#
# DROP TABLE IF EXISTS `Author`;
# /*!40101 SET @saved_cs_client     = @@character_set_client */;
# SET character_set_client = utf8mb4 ;
# CREATE TABLE `Author` (
#                           `id` int(11) NOT NULL AUTO_INCREMENT,
#                           `authorName` varchar(255) DEFAULT NULL,
#                           PRIMARY KEY (`id`)
# ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
# /*!40101 SET character_set_client = @saved_cs_client */;
#
# --
# -- Table structure for table `Book`
# --
#
# DROP TABLE IF EXISTS `Book`;
# /*!40101 SET @saved_cs_client     = @@character_set_client */;
# /*!50503 SET character_set_client = utf8mb4 */;
# CREATE TABLE `Book` (
#                         `id` int NOT NULL AUTO_INCREMENT,
#                         `isbn` varchar(255) DEFAULT NULL,
#                         `language` varchar(255) DEFAULT NULL,
#                         `noOfPages` int DEFAULT NULL,
#                         `publisher` varchar(255) DEFAULT NULL,
#                         `status` int DEFAULT NULL,
#                         `subject` varchar(255) DEFAULT NULL,
#                         `title` varchar(255) DEFAULT NULL,
#                         PRIMARY KEY (`id`)
# ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
# /*!40101 SET character_set_client = @saved_cs_client */;
#
# --
# -- Table structure for table `Book_Author`
# --
#
# DROP TABLE IF EXISTS `Book_Author`;
# /*!40101 SET @saved_cs_client     = @@character_set_client */;
# /*!50503 SET character_set_client = utf8mb4 */;
# CREATE TABLE `Book_Author` (
#                                `bookid` int NOT NULL,
#                                `authorid` int NOT NULL,
#                                KEY `FKpj2a81fneo0s8pudoutunx1df` (`authorid`),
#                                KEY `FKiv7xoltb6pr38g3kmuf5n5fnr` (`bookid`),
#                                CONSTRAINT `FKiv7xoltb6pr38g3kmuf5n5fnr` FOREIGN KEY (`bookid`) REFERENCES `Book` (`id`),
#                                CONSTRAINT `FKpj2a81fneo0s8pudoutunx1df` FOREIGN KEY (`authorid`) REFERENCES `Author` (`id`)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
# /*!40101 SET character_set_client = @saved_cs_client */;
