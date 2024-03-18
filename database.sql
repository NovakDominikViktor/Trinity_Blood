-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 18. 20:29
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `auth`
--
DROP DATABASE IF EXISTS `auth`;
CREATE DATABASE IF NOT EXISTS `auth` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `auth`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('780067f7-8b03-4131-9b00-f9f05892fa43', 'ADMIN', 'ADMIN', NULL),
('929fd86e-d0ae-4f00-937e-3e77f710227f', 'USER', 'USER', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('2c6fc608-71ae-473f-a6e0-5d09d75deab5', '780067f7-8b03-4131-9b00-f9f05892fa43'),
('2c6fc608-71ae-473f-a6e0-5d09d75deab5', '929fd86e-d0ae-4f00-937e-3e77f710227f'),
('2fa5b17c-1990-403f-8fb3-cf4e2d90a397', '929fd86e-d0ae-4f00-937e-3e77f710227f');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  `FullName` longtext NOT NULL,
  `FirstName` longtext NOT NULL,
  `LastName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`, `FullName`, `FirstName`, `LastName`) VALUES
('2c6fc608-71ae-473f-a6e0-5d09d75deab5', 'admin@admin.com', 'ADMIN@ADMIN.COM', 'admin@admin.com', 'ADMIN@ADMIN.COM', 0, 'AQAAAAIAAYagAAAAEBtJdS1IWGiAk13nvzWMpH5HU57iQzR3NUVocHGRrrHq2F8iT5EcBpyoqpeHaZuz3Q==', 'MWMP5LFPHIVO575O2UNCNK2452VPQWOW', 'f5433e7f-6e67-4a1a-84c4-9076544701c1', NULL, 0, 0, NULL, 1, 0, 'Admin Admin', 'Admin', 'Admin'),
('2fa5b17c-1990-403f-8fb3-cf4e2d90a397', 'novakd@kkszki.hu', 'NOVAKD@KKSZKI.HU', 'novakd@kkszki.hu', 'NOVAKD@KKSZKI.HU', 0, 'AQAAAAIAAYagAAAAEDhEEwR2oweGheIUYXsPcvAF+GUSP9DqZxk1dmjgenzYHCfXEQ3aL4gTZn2RA4e6dQ==', 'XD3C7RLUMBYCCL2TOGCSR6VCMC2HLF24', 'c6f9cdb8-dc51-40f6-a490-8e1cf7baba06', NULL, 0, 0, NULL, 1, 0, 'Dominik Novák', 'Dominik', 'Novák');

--
-- Eseményindítók `aspnetusers`
--
DELIMITER $$
CREATE TRIGGER `DeleteOrderU` AFTER DELETE ON `aspnetusers` FOR EACH ROW BEGIN
    DELETE FROM Orders
    WHERE UserId = OLD.Id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`Id`, `Name`) VALUES
(1, 'Medicine'),
(2, 'Beauty'),
(3, 'Supplements'),
(4, 'Personal Care');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Ratings` double NOT NULL,
  `Comments` longtext NOT NULL,
  `ReviewDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`Id`, `UserId`, `ProductId`, `Ratings`, `Comments`, `ReviewDate`) VALUES
(18, '2fa5b17c-1990-403f-8fb3-cf4e2d90a397', 4, 3.5, 'this is a nice shampoo', '2024-03-18 18:47:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `TotalPrice` decimal(65,30) NOT NULL,
  `OrderStatus` longtext NOT NULL,
  `OrderDate` datetime(6) NOT NULL,
  `Address` longtext NOT NULL,
  `City` longtext NOT NULL,
  `PhoneNumber` longtext NOT NULL,
  `ZipCode` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `Price` double NOT NULL,
  `IsItInStock` tinyint(1) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `PictureUrl` longtext NOT NULL,
  `StorageStock` int(11) NOT NULL,
  `PostedTime` datetime(6) NOT NULL DEFAULT '2020-03-14 01:01:01.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`Id`, `Name`, `Description`, `Price`, `IsItInStock`, `CategoryId`, `PictureUrl`, `StorageStock`, `PostedTime`) VALUES
(1, 'Aspirin Ultra', 'Pain reliever and fever reducer', 5.99, 1, 1, 'https://pingvinpatika.hu/pub/media/catalog/product/a/s/aspirin-ultra-500mg-bevont-tabletta-8x-296148-2.jpg', 100, '2020-03-14 01:01:01.000000'),
(2, 'Ibuprofen', 'Pain reliever and anti-inflammatory', 7.49, 1, 1, 'https://s.benu.hu/media/catalog/product/cache/1b657306323fd5cf9ea727d8a6c2df8f/i/b/ibuprofen_polfa_200_mg_bevont_tabletta_100x_147876_2016.jpg', 150, '2020-03-15 01:01:01.000000'),
(3, 'Vitamin C', 'Immune system support', 9.99, 1, 3, 'https://s.benu.hu/media/catalog/product/cache/1b657306323fd5cf9ea727d8a6c2df8f/e/g/egis_cvitamin_500mg.jpg', 200, '2020-03-14 01:01:01.000000'),
(4, 'L’Oréal Paris Elseve Hyaluron Plump Shampoo', 'Cleanses and nourishes hair', 12.99, 1, 4, 'https://licilasicdn.s3.amazonaws.com/public/product_images/43670/main/original.jpg', 80, '2020-03-30 01:01:01.000000'),
(5, 'Oral-B Complete Plus Protect & Clean Toothpaste Fresh Mint 75ml', 'Fights cavities and freshens breath', 3.49, 1, 4, 'https://static.beautytocare.com/media/catalog/product/o/r/oral-b-complete-plus-mouthwash-toothpaste-75ml_1.jpg', 120, '2020-03-14 01:01:01.000000'),
(6, 'La PIEL Hand Cream', 'Moisturizes and softens hands', 6.99, 1, 2, 'https://licilasicdn.s3.amazonaws.com/public/product_images/41502/main/original.jpg', 90, '2020-03-14 01:01:01.000000'),
(7, 'Garnier Skin Natural Hyaluronic Aloe Face Mask', 'Cleanses pores and revitalizes skin', 4.99, 1, 2, 'https://licilasicdn.s3.amazonaws.com/public/product_images/39458/main/original.jpg', 70, '2020-03-14 01:01:01.000000'),
(8, 'Nature\'s Bounty® Fish Oil', 'Supports heart and joint health', 15.99, 1, 3, 'https://naturesbounty.com/cdn/shop/products/087800.png?v=1667506722', 100, '2022-03-01 01:01:01.000000'),
(9, 'Labello Soft Rosé Lip Balm 4.8g', 'Hydrates and protects lips', 2.99, 1, 4, 'https://static.beautytocare.com/media/catalog/product/l/a/labello-soft-rose-lip-balm-4-8g.jpg', 110, '2020-03-14 01:01:01.000000'),
(10, 'Pyunkang Yul - ACNE Cream 50ml', 'Treats and prevents acne', 8.49, 1, 2, 'https://cosibella.hu/hun_pl_Pyunkang-Yul-ACNE-Cream-Akne-elleni-arckrem-50ml-1219_1.webp', 60, '2020-03-14 01:01:01.000000'),
(11, 'Professional Style Pink Hair Gel Strong With Pro Vitamin B5', 'Provides strong hold and shine', 6.49, 1, 4, 'https://i.makeup.hu/n/ng/ngd5of9gjmoe.jpg', 70, '2021-04-24 01:01:01.000000'),
(12, 'Centrum Advance Multivitamin Multimineral Tablets', 'Supports overall health and wellness', 11.99, 1, 3, 'https://media.glamourmagazine.co.uk/photos/63da7c23175377e5c1b41fee/1:1/w_1280%2Cc_limit/MULTIVITAMINS%2520010223%25202.jpg', 180, '2020-03-14 01:01:01.000000'),
(13, 'Coppertone SPORT Sunscreen SPF 50 Lotion, Water Resistant Sunscreen, Body Sunscreen Lotion, 7 Fl Oz', 'Protects against UV rays', 14.99, 1, 2, 'https://m.media-amazon.com/images/I/71I+WE0s1gL.jpg', 100, '2020-08-18 01:01:01.000000'),
(14, 'Equate Ultra Strength Antacid Tropical Fruit Chewable Tablets, 1000 mg, 160 Count', 'Relieves heartburn and acid indigestion', 4.49, 1, 1, 'https://i5.walmartimages.com/seo/Equate-Ultra-Strength-Antacid-Tropical-Fruit-Chewable-Tablets-1000-mg-160-Count_9f61df61-673e-4919-bfb2-03e84e028b90.c8effce29e8c1ae23262a32055eeb3be.jpeg', 120, '2020-03-14 01:01:01.000000'),
(15, 'Dove Original Stick Anti-Perspirant Deodorant 40ml', 'Provides long-lasting odor protection', 5.99, 1, 4, 'https://m.media-amazon.com/images/I/61HJyR+i8LL.jpg', 100, '2020-03-14 01:01:01.000000'),
(16, 'Handy Pocket Pal Redness Relief Eye Drops, Travel Size', 'Relieves dry and irritated eyes', 7.99, 1, 1, 'https://pics.walgreens.com/prodimg/597605/450.jpg', 80, '2020-03-14 01:01:01.000000'),
(17, 'Dermatologist Moisturizing Body Lotion 6% Urea', 'Hydrates and soothes dry skin', 10.99, 1, 2, 'https://skinsmart.hu/media/catalog/product/cache/8ac1e0cc7038d8ae53e7e71f09f92dfd/6/u/6urea-testapolo.jpg', 150, '2020-03-14 01:01:01.000000'),
(18, 'Hydrolyzed Whey Protein Powder XS™ Cocoa - Chocolate\r\n', 'Supports muscle growth and recovery', 19.99, 1, 3, 'https://media.amway.eu/sys-master/images/h0e/h55/11562589618206/product-image_800_800_121606_new.jpg_30d89cbf-fbab-435c-8d04-ba6155688b97_rcv_IMAGE_product-image_600_600', 90, '2020-03-14 01:01:01.000000'),
(19, 'Savage for Men 3.4 Oz Men\'s Eau De Toilette Spray Refreshing & Warm Masculine Scent for Daily Use Men\'s Casual Cologne Includes NovoGlow Carrying Pouch Smell Fresh All Day A Gift for Any Occasion', 'Provides a refreshing scent', 24.99, 1, 4, 'https://m.media-amazon.com/images/I/91Eqa0ZQCLL._AC_UF1000,1000_QL80_.jpg', 60, '2024-03-01 01:01:01.000000'),
(20, 'Colgate® Total® Mint Waxed Dental Floss', 'Removes plaque and food particles', 1.99, 1, 4, 'https://www.colgate.com.au/content/dam/cp-sites/oral-care/oral-care-center/en-au/product-detail-pages/specialty-products/colgate-total-mint-waxed.jpg', 200, '2020-03-14 01:01:01.000000');

--
-- Eseményindítók `products`
--
DELIMITER $$
CREATE TRIGGER `DeleteOrderP` AFTER DELETE ON `products` FOR EACH ROW BEGIN
    DELETE FROM Orders
    WHERE ProductId = OLD.Id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240123114836_IdentityDb', '8.0.1'),
('20240123121419_MyProperties', '8.0.1'),
('20240221190122_extension', '8.0.1'),
('20240221190526_tables', '8.0.1'),
('20240221192145_order', '8.0.1'),
('20240224162413_AffressToAddress', '8.0.1'),
('20240226115637_ProductKiegeszites', '8.0.1'),
('20240304190107_ratingToDouble', '8.0.1'),
('20240313071854_DecimalToDouble', '8.0.1'),
('20240313074008_StrogeToStorage', '8.0.1'),
('20240314072051_ConnectOrderToProductAndUser', '8.0.1'),
('20240314073832_CommentRemovedFromComment', '8.0.1'),
('20240317151155_addedTimeToProducts', '8.0.1');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- A tábla indexei `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- A tábla indexei `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- A tábla indexei `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- A tábla indexei `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Comments_ProductId` (`ProductId`),
  ADD KEY `IX_Comments_UserId` (`UserId`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Orders_ProductId` (`ProductId`),
  ADD KEY `IX_Orders_UserId` (`UserId`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Products_CategoryId` (`CategoryId`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_Comments_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Comments_Products_ProductId` FOREIGN KEY (`ProductId`) REFERENCES `products` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_Products_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
