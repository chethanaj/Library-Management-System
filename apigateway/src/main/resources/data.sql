# USE `Auth_DB`;
#
# --
# -- Dumping data for table `USER`
# --
#
# LOCK TABLES `USER` WRITE;
# /*!40000 ALTER TABLE `USER` DISABLE KEYS */;
# INSERT INTO `USER` VALUES (1,'$2a$11$xgGafMyhh49HGfFqFm6X5uSLvAGEYsbmB3RR3Qku9jq3rzo9P5n6q','saman@gmail.com'),(2,'$2a$11$Gfq8RSfZMaTjNQ3Hycoeoeei188SP/0uP95CFrku0UM0MmzCW/mji','adminuser@gmail.com');
# /*!40000 ALTER TABLE `USER` ENABLE KEYS */;
# UNLOCK TABLES;
#
# --
# -- Dumping data for table `USER_ROLES`
# --
#
# LOCK TABLES `USER_ROLES` WRITE;
# /*!40000 ALTER TABLE `USER_ROLES` DISABLE KEYS */;
# INSERT INTO `USER_ROLES` VALUES (1,'LIBUSER',1),(2,'LIBUSER',2),(3,'LIBADMIN',2);
# /*!40000 ALTER TABLE `USER_ROLES` ENABLE KEYS */;
# UNLOCK TABLES;
