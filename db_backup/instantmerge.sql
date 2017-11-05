-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2017 at 08:24 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `instantmerge`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatmessage`
--

CREATE TABLE IF NOT EXISTS `chatmessage` (
  `chatid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `sheetid` int(10) NOT NULL,
  `message` text NOT NULL,
  `addedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chatid`),
  KEY `userid` (`userid`),
  KEY `sheetid` (`sheetid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=64 ;

--
-- Dumping data for table `chatmessage`
--

INSERT INTO `chatmessage` (`chatid`, `userid`, `sheetid`, `message`, `addedon`) VALUES
(26, 2, 1, '1 now use Lorem Ipsum', '2016-12-15 12:31:07'),
(27, 2, 1, '2 now use Lorem Ipsum', '2016-12-15 12:31:08'),
(28, 1, 1, '3 now use Lorem Ipsum', '2016-12-15 12:31:52'),
(29, 1, 1, '4 now use Lorem Ipsum', '2016-12-15 12:32:16'),
(30, 1, 1, '5 now use Lorem Ipsum', '2016-12-15 12:32:39'),
(31, 2, 1, '6 now use Lorem Ipsum', '2016-12-15 12:32:42'),
(32, 1, 1, '7 now use Lorem Ipsum', '2016-12-15 12:33:36'),
(33, 2, 1, '8 now use Lorem Ipsum', '2016-12-15 12:34:07'),
(34, 1, 1, '9 now use Lorem Ipsum', '2016-12-15 12:35:25'),
(35, 2, 1, '10 now use Lorem Ipsum', '2016-12-15 12:35:46'),
(36, 1, 1, '11 now use Lorem Ipsum', '2016-12-15 12:35:50'),
(37, 2, 1, 'Hello', '2016-12-16 10:31:13'),
(38, 1, 1, 'hi mama', '2016-12-16 10:31:22'),
(39, 2, 1, 'Heillos dastan', '2016-12-16 10:31:38'),
(40, 6, 9, 'hello', '2016-12-16 13:09:28'),
(41, 5, 1, 'HEllo', '2016-12-16 13:36:44'),
(42, 5, 1, 'whats Up', '2016-12-16 13:36:53'),
(43, 6, 1, 'hello', '2016-12-16 13:37:18'),
(44, 5, 1, 'I am using sheet1', '2016-12-16 13:37:36'),
(45, 8, 1, 'hallo', '2016-12-16 13:37:36'),
(46, 6, 1, 'is it working?', '2016-12-16 13:39:07'),
(47, 2, 1, 'hi aqib here', '2016-12-16 13:39:09'),
(48, 2, 1, 'this is good', '2016-12-16 13:39:17'),
(49, 1, 1, 'hi Haseeb here', '2016-12-16 13:39:18'),
(50, 5, 1, 'yup its working', '2016-12-16 13:39:20'),
(51, 1, 1, 'yay', '2016-12-16 13:39:30'),
(52, 7, 1, 'emily', '2016-12-16 13:39:37'),
(53, 3, 1, 'ITS ME ABHISHEK', '2016-12-16 13:40:53'),
(54, 5, 1, 'We are showing demo by User5', '2016-12-16 14:10:09'),
(55, 7, 1, 'its working', '2016-12-16 14:10:24'),
(56, 8, 1, 'yuki is here', '2016-12-16 14:10:53'),
(57, 1, 1, 'hey', '2016-12-16 14:11:52'),
(58, 5, 1, 'USer 5 here', '2016-12-16 14:11:57'),
(59, 7, 1, 'hallo', '2016-12-16 14:11:58'),
(60, 7, 1, 'hallo', '2016-12-16 14:12:00'),
(61, 7, 1, 'hallo', '2016-12-16 14:12:01'),
(62, 2, 1, 'hi aqib here', '2016-12-16 14:12:08'),
(63, 5, 1, 'Hello', '2016-12-16 14:12:12');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `commentid` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `sheetid` int(10) NOT NULL,
  `description` text NOT NULL,
  `addedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`commentid`),
  KEY `userid` (`userid`),
  KEY `sheetid` (`sheetid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commentid`, `userid`, `sheetid`, `description`, `addedon`, `status`) VALUES
(1, 1, 1, '1 Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2016-12-15 11:09:49', NULL),
(2, 1, 1, '2 Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2016-12-15 11:33:41', NULL),
(3, 1, 1, '3 Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2016-12-15 12:12:08', NULL),
(4, 2, 1, '4 Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2016-12-15 12:12:15', NULL),
(5, 1, 1, 'haseeb2! 4 Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '2016-12-16 12:21:14', NULL),
(6, 5, 1, 'Hello', '2016-12-16 13:37:57', NULL),
(7, 2, 1, 'hellow aqib here', '2016-12-16 13:38:52', NULL),
(8, 6, 1, 'Mohsin here', '2016-12-16 13:39:38', NULL),
(9, 2, 1, 'hi aqib here every thing working fine', '2016-12-16 14:12:44', NULL),
(10, 5, 1, 'I am handling summation', '2016-12-16 14:12:47', NULL),
(11, 7, 1, 'emily here', '2016-12-16 14:12:50', NULL),
(12, 7, 1, 'emily here', '2016-12-16 14:12:52', NULL),
(13, 7, 1, 'emily here', '2016-12-16 14:12:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `resetpasswordrecord`
--

CREATE TABLE IF NOT EXISTS `resetpasswordrecord` (
  `recordid` int(10) NOT NULL AUTO_INCREMENT,
  `encryptedstr` text NOT NULL,
  `userid` int(10) NOT NULL,
  `generatedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expired` varchar(100) NOT NULL,
  PRIMARY KEY (`recordid`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `resetpasswordrecord`
--

INSERT INTO `resetpasswordrecord` (`recordid`, `encryptedstr`, `userid`, `generatedon`, `expired`) VALUES
(1, 'abc1', 1, '2016-11-24 11:55:21', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `sheet`
--

CREATE TABLE IF NOT EXISTS `sheet` (
  `sheetid` int(10) NOT NULL AUTO_INCREMENT,
  `sheetname` varchar(100) NOT NULL,
  `data` text,
  `createdby` int(10) DEFAULT NULL,
  `createdon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastmodifiedby` int(10) NOT NULL,
  `lastmodifiedon` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedreason` text,
  PRIMARY KEY (`sheetid`),
  KEY `createdby` (`createdby`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `sheet`
--

INSERT INTO `sheet` (`sheetid`, `sheetname`, `data`, `createdby`, `createdon`, `lastmodifiedby`, `lastmodifiedon`, `modifiedreason`) VALUES
(1, 'sheet1', '{"data":[[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]}', 1, '2016-12-08 10:46:52', 1, '2016-12-16 13:51:43', NULL),
(2, 'sheet2', '{"data":[[null,"5","6","7",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]}', 2, '2016-12-07 22:24:10', 2, '2016-12-11 23:18:09', NULL),
(3, 'sheet3', NULL, 3, '2016-12-10 17:08:16', 3, '2016-12-10 17:08:16', NULL),
(4, 'Sheet4', NULL, 2, '2016-12-11 23:23:16', 2, '2016-12-11 23:23:16', NULL),
(5, 'sheet5', NULL, 2, '2016-12-11 23:38:29', 2, '2016-12-11 23:38:29', NULL),
(6, 'sheet6', '{"data":[["1","5","7","8","9",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]}', 2, '2016-12-11 23:39:23', 2, '2016-12-12 17:07:56', NULL),
(7, 'sheet7', NULL, 1, '2016-12-11 23:40:20', 1, '2016-12-11 23:40:20', NULL),
(8, 'sheet8', '{"data":[["hehe",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]]}', 1, '2016-12-11 23:41:26', 1, '2016-12-11 23:41:35', NULL),
(9, '123', NULL, 6, '2016-12-16 13:07:58', 6, '2016-12-16 13:07:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE IF NOT EXISTS `subscriber` (
  `subscriberid` int(4) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `subscribedon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`subscriberid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`subscriberid`, `email`, `subscribedon`) VALUES
(4, 'me@haseebiqbal.com', '2016-12-15 17:21:16'),
(5, 'haseeb.iqbal28@gmail.com', '2016-12-15 17:21:41'),
(6, 'haseeb.iqbal29@gmail.com', '2016-12-15 17:21:49'),
(7, 'abc@abc.com', '2016-12-16 15:06:52'),
(8, 'quynh.d.nguyen@student.fh-kiel.de', '2016-12-16 15:25:03');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(4) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usertype` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `uname`, `fname`, `lname`, `email`, `password`, `usertype`) VALUES
(1, 'user1', 'haseeb', 'iqbal', 'haseeb.iqbal@student.fh-kiel.de', 'f750e5ebba', NULL),
(2, 'user2', 'aqib', 'iqbal2', 'aqbutt05@gmail.com', 'f750e5ebba', NULL),
(3, 'user3', 'abhishek', 'iqbal3', 'abhishekdiphu@gmail.com', 'f750e5ebba', NULL),
(4, 'admin', 'instant', 'merge', 'me@haseebiqbal.com', '4e0a48347a', NULL),
(5, 'user5', 'pankaja', 'dao', 'pankaja.ambalgi@student.fh-kiel.de', 'f750e5ebba', NULL),
(6, 'user6', 'moshin', 'nguyen', 'mohsinyounas05@gmail.com', 'f750e5ebba', NULL),
(7, 'user4', 'emily', 'nguyen', 'thi.h.nguyen@student.fh-kiel.de', 'f750e5ebba', NULL),
(8, 'user7', 'yuki', 'nguyen', 'quynh.d.nguyen@student.fh-kiel.de', 'f750e5ebba', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usersheetmapping`
--

CREATE TABLE IF NOT EXISTS `usersheetmapping` (
  `mappingid` int(11) NOT NULL AUTO_INCREMENT,
  `sheetid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `roles` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mappingid`),
  KEY `sheetid` (`sheetid`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `usersheetmapping`
--

INSERT INTO `usersheetmapping` (`mappingid`, `sheetid`, `userid`, `roles`) VALUES
(2, 2, 2, NULL),
(3, 3, 3, NULL),
(4, 1, 1, NULL),
(5, 6, 2, NULL),
(6, 8, 2, NULL),
(7, 8, 1, NULL),
(12, 1, 3, NULL),
(13, 1, 2, NULL),
(14, 9, 6, NULL),
(15, 9, 1, NULL),
(16, 1, 8, NULL),
(17, 1, 7, NULL),
(18, 1, 6, NULL),
(19, 1, 5, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chatmessage`
--
ALTER TABLE `chatmessage`
  ADD CONSTRAINT `chatmessage_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chatmessage_ibfk_2` FOREIGN KEY (`sheetid`) REFERENCES `sheet` (`sheetid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`sheetid`) REFERENCES `sheet` (`sheetid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `resetpasswordrecord`
--
ALTER TABLE `resetpasswordrecord`
  ADD CONSTRAINT `resetpasswordrecord_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `user` (`userid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `usersheetmapping`
--
ALTER TABLE `usersheetmapping`
  ADD CONSTRAINT `usersheetmapping_ibfk_1` FOREIGN KEY (`sheetid`) REFERENCES `sheet` (`sheetid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usersheetmapping_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
