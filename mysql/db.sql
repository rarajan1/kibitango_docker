-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: kibitango
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `grades_id` int NOT NULL AUTO_INCREMENT,
  `user_id` char(100) NOT NULL,
  `word_id` int NOT NULL,
  `success` tinyint(1) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`grades_id`),
  KEY `grades_fk_2` (`word_id`),
  KEY `grades_fk_1` (`user_id`),
  CONSTRAINT `grades_fk_2` FOREIGN KEY (`word_id`) REFERENCES `words` (`word_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=479 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tmp_words`
--

DROP TABLE IF EXISTS `tmp_words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_words` (
  `word` varchar(50) NOT NULL,
  UNIQUE KEY `word` (`word`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_words`
--

LOCK TABLES `tmp_words` WRITE;
/*!40000 ALTER TABLE `tmp_words` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_words` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` char(100) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `family_name` text,
  `first_name` text,
  `password` char(60) DEFAULT NULL,
  `email` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin',1,NULL,NULL,'$2b$08$5p7M0ifDajQeShBfEkhVpeBigd2RUCYBEQn4eZ83KI77peCB/bbju','admin@admin.com'),('okayama',0,'tagomori','yama','$2b$08$CwqVai7mH.7qCs7HbmYx.OP68NXoR4zOKWv6r8fgQN3WUnfLVTIvG','sample@sample.com'),('student',0,'妙','名前ff','$2b$08$ewLP1OyLsVyWk.5PEhG7z.8Vso5UCGGDJvz3B/KX2Lb1xqF1ONfF.','test@sample.comfdsafasd'),('student2',0,'fdsafdsa','fdsa','$2b$08$bBdMpEuJ4IM1N/welFRCsemsXJkIQiOqxIN0NwfbR2PpaVfdhdX.K','fdsa@fdsa.fda'),('teacher',1,'test','test','$2b$08$FiZa.LIHkM8p/utj1rzNSu8gkJfDU1d1vmA5FPyj40M9x8FIHjPHy','sample@sample.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words` (
  `word_id` int NOT NULL AUTO_INCREMENT,
  `phase` char(50) DEFAULT NULL,
  `word` char(50) DEFAULT NULL,
  `choices` text,
  `remark` text,
  `answer` varchar(50) NOT NULL,
  PRIMARY KEY (`word_id`),
  UNIQUE KEY `word` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=267322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `words`
--

LOCK TABLES `words` WRITE;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;
INSERT INTO `words` VALUES (267315,'0','MonDay','月曜日,火曜日,水曜日,木曜日','ここに説明文をくわえる','月曜日'),(267316,'0','TuesDay','月曜日,火曜日,水曜日,木曜日','test','火曜日'),(267317,'0','WednesDay','月曜日,火曜日,水曜日,木曜日','fdsafsdafsda','水曜日'),(267320,'0','Saturday','月曜日,土曜日,水曜日,木曜日','test','土曜日'),(267321,'0','Sunday','月曜日,火曜日,日曜日,木曜日','test','日曜日');
/*!40000 ALTER TABLE `words` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 23:33:24
