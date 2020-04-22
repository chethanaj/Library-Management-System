USE `Customer_DB`;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES (1,'CMB','LK','23'),(2,'CMB','LK','23'),(3,'CMB','LK','23'),(4,'CMB','LK','23');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,713378757,'adminuser@gmail.com','Admin','User',1),(2,713378757,'admin@gmail.com','Admin','Only',2),(3,713378757,'user@gmail.com','User','Only',3),(4,713378757,'non@gmail.com','No','Roles',4);
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;
