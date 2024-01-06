-- Create Database
DROP DATABASE IF EXISTS `pharmacy_v2`;
CREATE DATABASE IF NOT EXISTS `pharmacy_v2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pharmacy_v2`;

-- Permissions Table
CREATE TABLE `permissions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Categories Table
CREATE TABLE `categories` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Countries Table
CREATE TABLE `countries` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Users Table
CREATE TABLE `users` (
  `Id` char(36) NOT NULL,
  `FirstName` varchar(255),
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL UNIQUE,
  `Password` varchar(255) NOT NULL,
  `Address` varchar(255),
  `PermissionId` int(11) NOT NULL,
  `Image` mediumblob NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`PermissionId`) REFERENCES `permissions`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Products Table
CREATE TABLE `products` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Size` varchar(50),
  `Price` decimal(10,2) NOT NULL,
  `IsItInStock` tinyint(1) NOT NULL,
 
  `CategoryId` int(11) NOT NULL,
  `CountryId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),

  FOREIGN KEY (`CategoryId`) REFERENCES `categories`(`Id`),
  FOREIGN KEY (`CountryId`) REFERENCES `countries`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Reviews Table
CREATE TABLE `reviews` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` char(36) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Ratings` int(11) NOT NULL,
  `Comments` text,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`),
  FOREIGN KEY (`ProductId`) REFERENCES `products`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Orders Table
CREATE TABLE `orders` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` char(36) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL,
  `OrderStatus` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  FOREIGN KEY (`UserId`) REFERENCES `users`(`Id`),
  FOREIGN KEY (`ProductId`) REFERENCES `products`(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
