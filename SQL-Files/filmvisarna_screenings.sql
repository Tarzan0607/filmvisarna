-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: filmvisarna
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `screenings`
--

DROP TABLE IF EXISTS `screenings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screenings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `movie_id` int unsigned DEFAULT NULL,
  `auditorium_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `screenings_movie_id_foreign` (`movie_id`),
  KEY `screenings_auditorium_id_foreign` (`auditorium_id`),
  KEY `screenings_index_4` (`time`),
  CONSTRAINT `screenings_auditorium_id_foreign` FOREIGN KEY (`auditorium_id`) REFERENCES `auditoriums` (`id`),
  CONSTRAINT `screenings_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screenings`
--

LOCK TABLES `screenings` WRITE;
/*!40000 ALTER TABLE `screenings` DISABLE KEYS */;
INSERT INTO `screenings` VALUES (1,'2023-05-01 18:00:00',1,3),(2,'2023-05-01 21:00:00',2,3),(3,'2023-05-01 18:00:00',3,4),(4,'2023-05-01 21:00:00',4,4),(5,'2023-05-02 18:00:00',5,3),(6,'2023-05-02 21:00:00',1,3),(7,'2023-05-02 18:00:00',2,4),(8,'2023-05-02 21:00:00',3,4),(9,'2023-05-03 18:00:00',4,3),(10,'2023-05-03 21:00:00',5,3),(11,'2023-05-03 18:00:00',1,4),(12,'2023-05-03 21:00:00',2,4),(13,'2023-05-04 18:00:00',3,3),(14,'2023-05-04 21:00:00',4,3),(15,'2023-05-04 18:00:00',5,4),(16,'2023-05-04 21:00:00',1,4),(17,'2023-05-05 18:00:00',2,3),(18,'2023-05-05 21:00:00',3,3),(19,'2023-05-05 18:00:00',4,4),(20,'2023-05-05 21:00:00',5,4),(21,'2023-05-06 13:00:00',1,3),(22,'2023-05-06 18:00:00',2,3),(23,'2023-05-06 21:00:00',3,4),(24,'2023-05-06 13:00:00',4,4),(25,'2023-05-06 18:00:00',5,3),(26,'2023-05-06 21:00:00',1,3),(27,'2023-05-07 13:00:00',2,4);
/*!40000 ALTER TABLE `screenings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 18:06:31
