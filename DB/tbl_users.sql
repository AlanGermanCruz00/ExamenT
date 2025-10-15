-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         12.0.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla prueba.tbl_users
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `patters` longtext DEFAULT NULL,
  `create_at` datetime DEFAULT current_timestamp(),
  `email` varchar(200) DEFAULT NULL,
  `password` blob DEFAULT NULL,
  `id_rol` int(10) DEFAULT NULL,
  `id_status` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `FK_tbl_users_id_rol` (`id_rol`),
  KEY `FK_tbl_users_id_status` (`id_status`),
  CONSTRAINT `FK_tbl_users_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `tbl_roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_tbl_users_id_status` FOREIGN KEY (`id_status`) REFERENCES `tbl_status` (`id_status`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
