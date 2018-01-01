-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2018 at 04:47 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serie_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` text,
  `picture` varchar(200) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`id`, `title`, `description`, `picture`, `user_id`) VALUES
(7, 'Vikings', 'Vikings follows the adventures of Ragnar Lothbrok, the greatest hero of his age. The series tells the sagas of Ragnar\'s band of Viking brothers and his family, as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods. Legend has it that he was a direct descendant of Odin, the god of war and warriors.', 'https://image.tmdb.org/t/p/w500//oktTNFM8PzdseiK1X0E0XhB6LvP.jpg', 116),
(8, 'The Big Bang Theory', 'The Big Bang Theory is centered on five characters living in Pasadena, California: roommates Leonard Hofstadter and Sheldon Cooper; Penny, a waitress and aspiring actress who lives across the hall; and Leonard and Sheldon\'s equally geeky and socially awkward friends and co-workers, mechanical engineer Howard Wolowitz and astrophysicist Raj Koothrappali. The geekiness and intellect of the four guys is contrasted for comic effect with Penny\'s social skills and common sense.', 'https://image.tmdb.org/t/p/w500//ooBGRQBdbGzBxAVfExiO8r7kloA.jpg', 116),
(10, 'Ozark', 'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.', 'https://image.tmdb.org/t/p/w500//pCGyPVrI9Fzw6rE1Pvi4BIXF6ET.jpg', 109),
(11, 'Dragon Ball Super', 'Set just after the events of the Buu Saga of Dragon Ball Z, a deadly threat awakens once more. People lived in peace without knowing who the true heroes were during the devastating battle against Majin Buu. The powerful Dragon Balls have prevented any permanent damage, and our heroes also continue to live a normal life. In the far reaches of the universe, however, a powerful being awakens early from his slumber, curious about a prophecy of his defeat.\n\nJoin Gokuu, Piccolo, Vegeta, Gohan, and the rest of the Dragon Ball crew as they tackle the strongest opponent they have ever faced. Beerus, the god of destruction, now sets his curious sights on Earth. Will the heroes save the day and prevent earth\'s destruction? Or will the whims of a bored god prove too powerful for the Saiyans? Gokuu faces impossible odds once more and fights for the safety of his loved ones and the planet.', 'https://image.tmdb.org/t/p/w500//qEUrbXJ2qt4Rg84Btlx4STOhgte.jpg', 109),
(12, 'Marvel\'s Daredevil', 'Lawyer-by-day Matt Murdock uses his heightened senses from being blinded as a young boy to fight crime at night on the streets of Hell’s Kitchen as Daredevil.', 'https://image.tmdb.org/t/p/w500//cidOqJL8tayqvv3TpfTQCsgeITu.jpg', 109),
(13, 'How I Met Your Mother', 'How I Met Your Mother is an American sitcom that originally aired on CBS from September 19, 2005, to March 31, 2014. The series follows the main character, Ted Mosby, and his group of friends in Manhattan. As a framing device, Ted, in the year 2030, recounts to his son and daughter the events that led to his meeting their mother.', 'https://image.tmdb.org/t/p/w500//izncB6dCLV7LBQ5MsOPyMx9mUDa.jpg', 120);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `admin`) VALUES
(23, 'Giacomo', 'consequat.lectus.sit@sagittisDuisgravida.com', 'BLH72NTM0WR', 0),
(24, 'ogen', 'senectus.et@urnajusto.net', 'GPZ51OZE4LV', 0),
(25, 'Callum', 'nibh@felisullamcorper.com', 'CKQ34SKV6YH', 0),
(26, 'Ciaran', 'Aliquam.ornare@Classaptent.net', 'SFZ67AYY2RT', 0),
(27, 'Lamar', 'semper.cursus@ipsumprimisin.ca', 'MOZ73DMF5FZ', 0),
(29, 'Herman', 'risus.at.fringilla@Quisque.edu', 'HEQ39DLB3WV', 0),
(30, 'Ignatius', 'Duis@Duismi.net', 'LMM89LUU6QP', 0),
(31, 'Trevor', 'natoque@milaciniamattis.org', 'HWM31ZCA1AI', 0),
(32, 'Tarik', 'Ut.nec@dictumauguemalesuada.co.uk', 'WSI56PLE8UG', 0),
(33, 'Noah', 'iaculis.quis@felispurusac.com', 'QKH02CAG6LW', 0),
(34, 'Elton', 'congue.elit.sed@quam.com', 'ETQ96DPH0WG', 0),
(35, 'Salvador', 'metus.In@ipsumdolor.co.uk', 'IND40IKP4NH', 0),
(36, 'Alvin', 'justo.faucibus@dictumeu.ca', 'SYA68JGL5UM', 0),
(37, 'Nero', 'molestie.Sed@tempusnon.edu', 'TVK15VCL3ZJ', 0),
(38, 'Gareth', 'facilisis@orciDonecnibh.ca', 'WYA58ZQB0OB', 0),
(39, 'Ross', 'odio@etnetus.ca', 'JNC96BPV6EA', 0),
(40, 'Amos', 'Cum.sociis@nullaDonec.edu', 'RDO02GWL1WW', 0),
(41, 'Plato', 'tristique.ac@pellentesque.org', 'IJZ28LXY3VB', 0),
(42, 'Chaim', 'amet@vitae.net', 'LCN51CRN2GA', 0),
(43, 'Macon', 'ligula.eu.enim@quislectus.net', 'QUA81ZNG6CG', 0),
(44, 'Coby', 'semper@purus.ca', 'JOD12NBS9ZI', 0),
(45, 'Kadeem', 'vel@egestas.net', 'XXR89FPK0WB', 0),
(46, 'Malik', 'lacus.Nulla@arcu.edu', 'UTO29XIR4NK', 0),
(47, 'Dillon', 'in.cursus@placeratorci.co.uk', 'HQU56PMQ5SM', 0),
(48, 'Yardley', 'vitae.dolor.Donec@ProindolorNulla.edu', 'LHB92FAE0MR', 0),
(49, 'Vaughan', 'accumsan.interdum.libero@sem.co.uk', 'TWD83IUA3IX', 0),
(50, 'Ian', 'risus.a@sitametnulla.co.uk', 'HYB54PWK9OY', 0),
(51, 'Christian', 'non.feugiat.nec@pedeNuncsed.org', 'UXK08GNX0ME', 0),
(52, 'Andrew', 'velit.dui@CuraeDonectincidunt.org', 'QVJ83BRC7OB', 0),
(53, 'Baxter', 'sapien.imperdiet@tortordictum.edu', 'GAP55RMQ1SV', 0),
(54, 'Igor', 'Aliquam.gravida@purus.ca', 'KBV04TMJ8ML', 0),
(55, 'Branden', 'dapibus.gravida.Aliquam@Fusce.org', 'RFG90IVT6KY', 0),
(56, 'Lucian', 'nunc.nulla.vulputate@tempusnonlacinia.org', 'LOG00DXR0ZJ', 0),
(57, 'Brent', 'mi@tincidunt.co.uk', 'VIF50LUY8RZ', 0),
(58, 'Cooper', 'metus@lectusjusto.org', 'SNY90IHX1UF', 0),
(59, 'Eagan', 'egestas.a@nisiaodio.edu', 'QQN48LNI5BN', 0),
(60, 'Daquan', 'ut@sitametultricies.com', 'LRC01HYJ4DJ', 0),
(62, 'Neville', 'vehicula.aliquet@erat.org', 'QHO61RQZ2FJ', 0),
(63, 'Aidan', 'elit@orcitinciduntadipiscing.co.uk', 'JPC27OAM4PY', 0),
(64, 'Benedict', 'eget@nonummyutmolestie.ca', 'PBV63ITW2ZD', 0),
(65, 'Randall', 'eget.tincidunt.dui@tellus.edu', 'CXR64YAU9AE', 0),
(66, 'Rooney', 'consectetuer.rhoncus.Nullam@eudui.co.uk', 'OOE50OAD3KE', 0),
(67, 'Clinton', 'rutrum@Integervitaenibh.com', 'KFA85GBI1UK', 0),
(68, 'Demetrius', 'scelerisque@dolorelitpellentesque.edu', 'BIZ12JGV1BW', 0),
(69, 'Carter', 'sollicitudin.adipiscing@utsemNulla.ca', 'HIU13YVR8ZR', 0),
(70, 'Axel', 'scelerisque.neque@massaSuspendisseeleifend.co.uk', 'EDM79KOK0MD', 0),
(71, 'Owen', 'est.tempor.bibendum@gravidaAliquam.net', 'TPY99GLM9OQ', 0),
(72, 'Ira', 'magna.Cras@Cumsociisnatoque.edu', 'WMM96TIK3DG', 0),
(73, 'Jelani', 'ipsum.dolor@pellentesque.net', 'VFF52YXC1US', 0),
(74, 'Omar', 'Fusce.mollis.Duis@amet.org', 'BHS44XIS7RM', 0),
(75, 'Lucian', 'non.feugiat@ipsum.co.uk', 'FLE59VMX4IY', 0),
(76, 'Harding', 'euismod@amet.co.uk', 'NKK08ASX9GP', 0),
(77, 'Christopher', 'nascetur@sagittis.co.uk', 'YCS80XMW0SP', 0),
(78, 'Nathan', 'Aliquam.nec.enim@nislQuisque.co.uk', 'DQI38YYC0DR', 0),
(79, 'Ryder', 'Praesent@ac.net', 'UJT79BIU5GX', 0),
(80, 'Jordan', 'ligula.Nullam.feugiat@cursuspurus.net', 'DFY55YBE6YP', 0),
(81, 'Colton', 'purus.gravida.sagittis@dolor.org', 'SBW06WGZ2OF', 0),
(82, 'Xenos', 'leo@necligula.edu', 'WRF50AFV4JO', 0),
(83, 'Anthony', 'gravida.sit.amet@felis.co.uk', 'MXB98HOG5NK', 0),
(84, 'Harper', 'congue.turpis.In@cursus.org', 'OUI59YKO6CD', 0),
(85, 'Brenden', 'placerat@Sed.org', 'RVA48WVI9BJ', 0),
(86, 'Devin', 'semper.rutrum@loremegetmollis.ca', 'KAT77BJS7YD', 0),
(87, 'Yardley', 'consectetuer.cursus.et@lobortis.edu', 'ZQP88MPL4QQ', 0),
(88, 'Timon', 'sit@Nuncmauris.edu', 'IZA37WOI6AX', 0),
(89, 'Omar', 'tellus@risus.com', 'EPI41SZC7KM', 0),
(90, 'Melvin', 'amet.dapibus.id@natoquepenatibus.edu', 'PWT50QNW4IG', 0),
(92, 'Josiah', 'porttitor.vulputate.posuere@conubianostraper.ca', 'DMV25TNV4KN', 0),
(93, 'Hakeem', 'a.ultricies.adipiscing@parturientmontes.org', 'SZW87RWQ9IM', 0),
(94, 'Owen', 'vitae.purus.gravida@nec.org', 'JPZ60MAB2DB', 0),
(95, 'Donovan', 'Fusce.feugiat@lobortisquam.com', 'ZZO70NKV5OJ', 0),
(96, 'Elton', 'vehicula.aliquet.libero@tinciduntorci.net', 'RLA89AZI4DY', 0),
(97, 'Silas', 'tempus@auctorveliteget.com', 'TBS91DGE2IC', 0),
(99, 'Jonas', 'sagittis@arcu.ca', 'EIB46ZBC7UV', 0),
(100, 'Giacomo', 'magnis@sedliberoProin.org', 'BXZ36NGI5WA', 0),
(109, 'Tomekske', 'joostenstomek@gmail.be', 'joostens', 1),
(110, 'Kemotje', 'kemotje@gmail.com', 'kemotje', 0),
(114, 'qwerty', 'qwerty@gmail.com', 'qwerty', 0),
(115, 'ytrewq', 'qwerty@hotmail.com', 'qwerty', 0),
(116, 'hihi', 'hihi@gmail.com', 'lol', 0),
(117, 'haha', 'haha@gmail.com', 'lolololol', 0),
(118, 'scooby', 'scooby@do.cn', 'food', 0),
(119, 'flanders', 'lander@borms.com', 'bplaneet', 0),
(120, 'robby', 'robby@indo.id', 'sippa', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
