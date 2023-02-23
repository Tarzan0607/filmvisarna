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
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `auditorium_id` int unsigned NOT NULL,
  `row` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `seats_auditorium_foreign` (`auditorium_id`),
  KEY `seats_index_3` (`number`),
  KEY `seats_index_4` (`row`),
  CONSTRAINT `seats_auditorium_foreign` FOREIGN KEY (`auditorium_id`) REFERENCES `auditoriums` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (1,1,3,1),(2,2,3,1),(3,3,3,1),(4,4,3,1),(5,5,3,1),(6,6,3,1),(7,7,3,1),(8,8,3,1),(9,9,3,2),(10,10,3,2),(11,11,3,2),(12,12,3,2),(13,13,3,2),(14,14,3,2),(15,15,3,2),(16,16,3,2),(17,17,3,2),(18,18,3,3),(19,19,3,3),(20,20,3,3),(21,21,3,3),(22,22,3,3),(23,23,3,3),(24,24,3,3),(25,25,3,3),(26,26,3,3),(27,27,3,3),(28,28,3,4),(29,29,3,4),(30,30,3,4),(31,31,3,4),(32,32,3,4),(33,33,3,4),(34,34,3,4),(35,35,3,4),(36,36,3,4),(37,37,3,4),(38,38,3,5),(39,39,3,5),(40,40,3,5),(41,41,3,5),(42,42,3,5),(43,43,3,5),(44,44,3,5),(45,45,3,5),(46,46,3,5),(47,47,3,5),(48,48,3,6),(49,49,3,6),(50,50,3,6),(51,51,3,6),(52,52,3,6),(53,53,3,6),(54,54,3,6),(55,55,3,6),(56,56,3,6),(57,57,3,6),(58,58,3,7),(59,59,3,7),(60,60,3,7),(61,61,3,7),(62,62,3,7),(63,63,3,7),(64,64,3,7),(65,65,3,7),(66,66,3,7),(67,67,3,7),(68,68,3,7),(69,69,3,7),(70,70,3,8),(71,71,3,8),(72,72,3,8),(73,73,3,8),(74,74,3,8),(75,75,3,8),(76,76,3,8),(77,77,3,8),(78,78,3,8),(79,79,3,8),(80,80,3,8),(81,81,3,8),(82,1,4,1),(83,2,4,1),(84,3,4,1),(85,4,4,1),(86,5,4,1),(87,6,4,1),(88,7,4,2),(89,8,4,2),(90,9,4,2),(91,10,4,2),(92,11,4,2),(93,12,4,2),(94,13,4,2),(95,14,4,2),(96,15,4,3),(97,16,4,3),(98,17,4,3),(99,18,4,3),(100,19,4,3),(101,20,4,3),(102,21,4,3),(103,22,4,3),(104,23,4,3),(105,24,4,4),(106,25,4,4),(107,26,4,4),(108,27,4,4),(109,28,4,4),(110,29,4,4),(111,30,4,4),(112,31,4,4),(113,32,4,4),(114,33,4,4),(115,34,4,5),(116,35,4,5),(117,36,4,5),(118,37,4,5),(119,38,4,5),(120,39,4,5),(121,40,4,5),(122,41,4,5),(123,42,4,5),(124,43,4,5),(125,44,4,6),(126,45,4,6),(127,46,4,6),(128,47,4,6),(129,48,4,6),(130,49,4,6),(131,50,4,6),(132,51,4,6),(133,52,4,6),(134,53,4,6),(135,54,4,6),(136,55,4,6);
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 18:15:23
