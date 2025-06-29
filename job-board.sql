-- MySQL dump 10.13  Distrib 8.0.42, for macos15 (arm64)
--
-- Host: localhost    Database: job_board
-- ------------------------------------------------------
-- Server version	9.3.0-commercial

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
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `address` text,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `skills` text,
  `experience` text,
  `education_status` enum('graduate','currently_graduating') DEFAULT NULL,
  `resume_filename` varchar(255) DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
INSERT INTO `job_applications` VALUES (1,'Teja','Pullabhotla','1234 riviersidde','tejaswibharadwajp@gmail.com','+1- 281-854-5360','and ​Interpersonal skills​ with a strong ability to excel through collaboration with','●Over 5 years​ of professional experience in managing web, IT and other projects​ in developing highly scalable modern web','graduate','1751214999852_TejaswiP_Resume.pdf','2025-06-29 16:36:39'),(2,'Tejaswi','Pullabhotla','3364 Ravinia Cir','tejaswibharadwajp@gmail.com','+1- 281-854-5360','and ​Interpersonal skills​ with a strong ability to excel through collaboration with','●Over 5 years​ of professional experience in managing web, IT and other projects​ in developing highly scalable modern web','graduate','1751215184525_TejaswiP_Resume.pdf','2025-06-29 16:39:44'),(3,'Teja','P','test123','test@gmail.com','+1- 281-854-5360','and ​Interpersonal skills​ with a strong ability to excel through collaboration with','●Over 5 years​ of professional experience in managing web, IT and other projects​ in developing highly scalable modern web','graduate','1751215254871_TejaswiP_Resume.pdf','2025-06-29 16:40:54'),(4,'Teja','P','test123','test@gmail.com','+1- 281-854-5360','and ​Interpersonal skills​ with a strong ability to excel through collaboration with','●Over 5 years​ of professional experience in managing web, IT and other projects​ in developing highly scalable modern web','graduate','1751215363427_TejaswiP_Resume.pdf','2025-06-29 16:42:43');
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_logo` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `job_type` enum('Job','Internship','Opportunity') DEFAULT NULL,
  `description` text,
  `paid` enum('Paid','Unpaid') DEFAULT NULL,
  `location_type` enum('Remote','Hybrid','On-site') DEFAULT NULL,
  `posted_date` date DEFAULT NULL,
  `approved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'www.tesla.com','Tesla','AI Intern','Internship','AI, ML, LLM, NLM','Paid','Hybrid','2025-06-27',1),(2,'www.tesla.com','Tesla','AI Intern','Job','tetst','Paid','Remote','2025-06-27',0),(3,'','Google','Front End Intern','Internship','Must be enrolled in a graduate progranm','Paid','Hybrid','2025-06-28',1);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','company','staff') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'student1','$2b$10$Ey4Kse49mp8Hs4FNkBmYAeATwIz/0c.sI6.GGYaWYz7sNbdUvEsEO','student'),(2,'company1','$2b$10$Ey4Kse49mp8Hs4FNkBmYAeATwIz/0c.sI6.GGYaWYz7sNbdUvEsEO','company'),(3,'staff1','$2b$10$Ey4Kse49mp8Hs4FNkBmYAeATwIz/0c.sI6.GGYaWYz7sNbdUvEsEO','staff');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-29 12:13:26
