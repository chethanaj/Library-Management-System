# USE `Book_DB`;
#
# --
# -- Dumping data for table `Author`
# --
#
# LOCK TABLES `Author` WRITE;
# /*!40000 ALTER TABLE `Author` DISABLE KEYS */;
# INSERT INTO `Author` VALUES (1,'Roald Dahl'),(2,'Mark Anthony'),(3,'Sasha Fery'),(4,'Ann Mary'),(5,'Quentin Blake'),(6,'Martin Wickramasingha');
# /*!40000 ALTER TABLE `Author` ENABLE KEYS */;
# UNLOCK TABLES;
#
# --
# -- Dumping data for table `Book`
# --
#
# LOCK TABLES `Book` WRITE;
# /*!40000 ALTER TABLE `Book` DISABLE KEYS */;
# INSERT INTO `Book` VALUES (1,'1234ASD','English',124,'Sarasavi',0,'Children Book','The Witches'),(2,'123WER','English',160,'Pears Publishers',0,'Children Book','Matilda'),(3,'12345TQ','English',342,'Femingo ',0,'Classical','Going Solo'),(4,'1238RTY','English',100,'Penguin',0,'Children Book','The BGF'),(5,'1239JK','Sinhala',300,'Sarasavi',0,'Young Adults','Madol Duwa');
# /*!40000 ALTER TABLE `Book` ENABLE KEYS */;
# UNLOCK TABLES;
#
# --
# -- Dumping data for table `Book_Author`
# --
#
# LOCK TABLES `Book_Author` WRITE;
# /*!40000 ALTER TABLE `Book_Author` DISABLE KEYS */;
# INSERT INTO `Book_Author` VALUES (1,1),(2,2),(2,3),(3,4),(4,5),(5,6);
# /*!40000 ALTER TABLE `Book_Author` ENABLE KEYS */;
# UNLOCK TABLES;
