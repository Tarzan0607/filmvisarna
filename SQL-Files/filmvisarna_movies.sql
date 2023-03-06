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
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movies_index_2` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Call me by your name','Filmen utspelas i norra Italien sommaren 1983. En ung amerikansk-italienare blir förälskad i en amerikansk student som kommer för att studera och bo hos hans familj.</p><p>Tillsammans upplever de en oförglömlig sommar - full av musik, mat och kärlek - som för evigt kommer att förändra dem.'),(2,'Dune','DUNE berättar historien om Paul Atreides, en briljant och talangfull ung man född med ett storslaget öde, som måste resa till den farligaste planeten i universum för att säkra sin familjs och sitt folks framt. När illasinnade krafter kastas in i en konflikt över tillgången på planetens mest värdefulla råvara - ett ämne med förmåga att låsa upp mänsklighetens fulla potential - kommer bara de som övervinner sina rädslor att överleva.'),(3,'Spider-man: Into the Spider-verse','Miles Morales är en 13-åring från Broooklyn och en Spider-Man olik alla andra vi någonsin sett tidigare. Han är en klipsk tonåring som gillar att hänga med sina vänner och vara som barn i den åldern är mest. Men vad hans vänner inte vet är att Miles också lär sig att omfamna ett helt nytt och oväntat liv som den helt nye Spider-Man! Med hjälp av några överraskande nya vänner lär Miles sig att hitta hjälten inom sig.'),(4,'Sagan Om Konungens Återkomst','Den avslutande delen i trilogin om Härskarringen. Det sista och avgörande slaget om Midgård står för dörren. Aragorn återvänder till Gondor för att leda sitt folk i det sista slaget mot ondskans makter. Samtidigt närmar sig Sam och Frodo Domedagsberget och sitt mål att förstöra den mäktiga härskarringen.'),(5,'John Wick','I första filmen om John Wick bryter ett ryskt maffiagäng in i John Wicks hem för att stjäla hans eftertraktade Mustang. I samband med detta råkar de döda Johns hund som han har fått av sin bortgångna fru, vilket leder till att John ger sig ut på en jakt för att mörda männen. I jakten stöter han på den ryska maffiabossen Viggo Tarasov och bestämmer sig för att förgöra hans imperium.');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
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
