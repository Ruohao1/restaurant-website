DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS food CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS menu_food CASCADE;
DROP TABLE IF EXISTS food_types CASCADE;

CREATE TABLE menu_categories (
category_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
category_title TEXT NULL,
category_letter TEXT NULL);

CREATE TABLE food (
food_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
type_id INTEGER NOT NULL,
food_code TEXT NULL UNIQUE,
food_name TEXT NOT NULL,
food_description TEXT NULL,
serving_quantity INTEGER DEFAULT 1,
food_price MONEY NOT NULL,
food_image TEXT NULL);

CREATE TABLE menu (
menu_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
category_id INTEGER NOT NULL,
menu_code TEXT NULL UNIQUE,
menu_name TEXT NOT NULL,
menu_description TEXT NULL,
menu_price MONEY NOT NULL,
menu_image INTEGER NULL);

CREATE TABLE menu_food (
menu_id INTEGER NOT NULL,
food_id INTEGER NULL,
food_type_id INTEGER NULL,
quantity INTEGER NOT NULL);

CREATE TABLE food_types (
type_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
type_title TEXT NOT NULL,
type_code TEXT NULL,
serving_quantity INTEGER NULL DEFAULT 1);

ALTER TABLE food ADD CONSTRAINT food_type_id_food_types_type_id FOREIGN KEY (type_id) REFERENCES food_types(type_id);
ALTER TABLE menu ADD CONSTRAINT menu_category_id_menu_categories_category_id FOREIGN KEY (category_id ) REFERENCES menu_categories(category_id);
ALTER TABLE menu_food ADD CONSTRAINT menu_food_menu_id_menu_menu_id FOREIGN KEY (menu_id) REFERENCES menu(menu_id);
ALTER TABLE menu_food ADD CONSTRAINT menu_food_food_id_food_food_id FOREIGN KEY (food_id) REFERENCES food(food_id);
ALTER TABLE menu_food ADD CONSTRAINT menu_food_type_id_food_types_type_id FOREIGN KEY (food_type_id) REFERENCES food_types(type_id);

ALTER TABLE public.food_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_food ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
ON public.food_types
FOR SELECT
USING (true);

CREATE POLICY "Allow read access to all users"
ON public.menu_categories
FOR SELECT
USING (true);

CREATE POLICY "Allow read access to all users"
ON public.food
FOR SELECT
USING (true);

CREATE POLICY "Allow read access to all users"
ON public.menu
FOR SELECT
USING (true);

CREATE POLICY "Allow read access to all users"
ON public.menu_food
FOR SELECT
USING (true);


INSERT INTO food_types (type_id, type_title, type_code, serving_quantity) VALUES
(1, 'Starter', 'E', 1),
(2, 'Maki', 'MA', 6),
(3, 'California maki', 'MC', 8),
(4, 'Dragon roll', 'MC', 8),
(5, 'Croustillant', 'MC', 8),
(6, 'Egg roll', 'MC', 8),
(7, 'Salmon roll', 'MC', 8),
(8, 'Maki printemps', 'MC', 8),
(9, 'Maki neige', 'MC', 8),
(10, 'Sushi', 'SU', 2),
(11, 'Sashimi', 'SA', 10),
(12, 'Skewer', 'Y', 2),
(13, 'Drinks', NULL, 1),
(14, 'Beer', NULL, 1),
(15, 'Wine', NULL, 1),
(16, 'Plats chauds', 'P', 1),
(17, 'Salade Yamayoshi', 'E', 1);

INSERT INTO menu_categories (category_id, category_title, category_letter) VALUES
(1, 'À la carte', NULL),
(2, 'Menus mixtes', 'A'),
(3, 'Menus chirashi', 'S'),
(4, 'Poké bowl', 'PK'),
(5, 'Menus express', NULL),
(6, 'Menus', NULL),
(7, NULL, NULL),
(8, 'Menu bento', 'BT'),
(9, 'Menu enfant', 'F'),
(10, 'Nos familles', NULL);

INSERT INTO food (food_id, type_id, food_code, food_name, food_description, serving_quantity, food_price, food_image) VALUES
(1, 1, 'E1', 'Riz nature', NULL, 1, 2, NULL),
(2, 1, 'E2', 'Salade de choux', NULL, 1, 3, NULL),
(3, 1, 'E3', 'Soupe miso', NULL, 1, 2.5, NULL),
(4, 1, 'E4', 'Riz cantonais', NULL, 1, 5.5, NULL),
(5, 1, 'E5', 'Riz vinaigré', NULL, 1, 3, NULL),
(6, 1, 'E6', 'Riz sauté au curry et aux crevettes', NULL, 1, 6.5, NULL),
(7, 1, 'E7', 'Gyoza', 'raviolis grillés', 6, 6, NULL),
(8, 1, 'E8', 'Raviolis aux crevettes vapeur', NULL, 6, 6, NULL),
(9, 1, 'E9', 'Nems au poulet', NULL, 6, 6.5, NULL),
(10, 1, 'E10', 'Tempura crevettes', NULL, NULL, 10, NULL),
(11, 1, 'E11', 'Shaké tempura', 'beignet saumon', NULL, 10, NULL),
(12, 1, 'E12', 'Beignet poulet', NULL, NULL, 6.5, NULL),
(13, 1, 'E13', 'Beignet fromage', NULL, 6, 6.5, NULL),
(14, 1, 'E14', 'Samoussa', NULL, 3, 5.5, NULL),

(15, 2, 'MA1', 'Maki saumon', NULL, 6, 5, NULL),
(16, 2, 'MA2', 'Maki thon', NULL, 6, 5.5, NULL),
(17, 2, 'MA3', 'Maki anguille', NULL, 6, 6, NULL),
(18, 2, 'MA4', 'Maki concombre', NULL, 6, 4.5, NULL),
(19, 2, 'MA6', 'Maki avocat', NULL, 6, 4.5, NULL),
(20, 2, 'MA7', 'Maki boeuf au fromage', NULL, 6, 6, NULL),
(21, 2, 'MA8', 'Maki avocat fromage', NULL, 6, 6, NULL),
(22, 2, 'MA9', 'Maki radis', NULL, 6, 4.5, NULL),
(23, 2, 'MA10', 'Maki saumon fromage', NULL, 6, 6, NULL),
(24, 2, 'MA11', 'Maki thon épicé', NULL, 6, 5.5, NULL),
(25, 2, 'MA12', 'Futomaki', 'saumon, thon, avocat, surimi concombre, cheese', 6, 7.5, NULL),
(26, 2, 'MA13', 'Futomaki végétarien', NULL, 5, 6.5, NULL),
(27, 2, 'MA14', 'Temaki cornet au choix', 'thon, saumon, surimi, crevette, boeuf au fromage', 2, 6.5, NULL),

(28, 3, 'MC1', 'California crevettes avocat mayonnaise', NULL, 8, 5.5, NULL),
(29, 3, 'MC2', 'California saumon avocat', NULL, 8, 5.5, NULL),
(30, 3, 'MC3', 'California surimi avocat', NULL, 8, 5.5, NULL),
(31, 3, 'MC4', 'California thon cuit avocat mayonnaise', NULL, 8, 5.5, NULL),
(32, 3, 'MC5', 'California Nigiri Las vegas couchée dune tranche de saumon', NULL, 8, 6.2, NULL),
(33, 3, 'MC6', 'California croustillant poulet beignet', NULL, 8, 6, NULL),
(34, 3, 'MC7', 'California tempura crevettes', NULL, 8, 7, NULL),
(35, 3, 'MC9', 'California coriandre thon cuit', NULL, 8, 6.5, NULL),
(36, 3, 'MC10', 'California Las vegas à la sauce épicée', NULL, 8, 6.5, NULL),

(37, 4, 'MC11', 'Dragon roll saumon avocat', NULL, 8, 8.5, NULL),
(38, 4, 'MC12', 'Dragon roll tempura crevettes à la sauce épicée', NULL, 8, 9, NULL),
(39, 4, 'MC13', 'Dragon roll thon cuit avocat fromage', NULL, 8, 8.5, NULL),

(40, 5, 'MC14', 'Croustillant saumon grillé', NULL, 8, 7, NULL),
(41, 5, 'MC15', 'Croustillant tempura crevettes à la sauce épicée', NULL, 8, 7.5, NULL),
(42, 5, 'MC16', 'Croustillant poulet épicée', NULL, 8, 7, NULL),

(43, 6, 'MC18', 'Egg roll cheese avocat', NULL, 8, 7, NULL),
(44, 6, 'MC19', 'Egg roll thon cuit avocat', NULL, 8, 7, NULL),
(45, 6, 'MC20', 'Egg roll saumon grillé à la sauce sucré', NULL, 8, 7, NULL),

(46, 7, 'MC21', 'Saumon roll saumon', NULL, 8, 7, NULL),
(47, 7, 'MC22', 'Saumon roll fromage', NULL, 8, 7, NULL),
(48, 7, 'MC23', 'Saumon roll fromage avocat', NULL, 8, 7.5, NULL),
(49, 7, 'MC24', 'Saumon roll fromage concombre', NULL, 8, 7.5, NULL),
(50, 7, 'MC25', 'Saumon roll thon cuit', NULL, 8, 7, NULL),

(51, 8, 'MC26', 'Maki printemps fromage concombre', NULL, 8, 6.5, NULL),
(52, 8, 'MC27', 'Maki printemps fromage saumon', NULL, 8, 6.5, NULL),
(53, 8, 'MC28', 'Maki printemps thon rouge avocat', NULL, 8, 7, NULL),
(54, 8, 'MC29', 'Maki printemps crevettes avocat', NULL, 8, 7, NULL),
(55, 8, 'MC30', 'Maki printemps thon cuit', NULL, 8, 7, NULL),
(56, 8, 'MC31', 'Maki printemps tempura crevettes à la sauce épicée', NULL, 8, 7, NULL),

(57, 9, 'MC32', 'Maki neige saumon', NULL, 8, 6, NULL),
(58, 9, 'MC33', 'Maki neige thon', NULL, 8, 6, NULL),
(59, 9, 'MC34', 'Maki neige thon cuit', NULL, 8, 6, NULL),
(60, 9, 'MC35', 'Maki neige tempura crevettes', NULL, 8, 6.5, NULL),
(61, 9, 'MC36', 'Maki neige fromage', NULL, 8, 6, NULL),

(62, 10, 'SU1', 'Sushi saumon', NULL, 2, 4.5, NULL),
(63, 10, 'SU2', 'Sushi thon', NULL, 2, 4.5, NULL),
(64, 10, 'SU3', 'Sushi daurade', NULL, 2, 4.5, NULL),
(65, 10, 'SU4', 'Sushi avocat', NULL, 2, 4.5, NULL),
(66, 10, 'SU5', 'Sushi maquereau', NULL, 2, 4.5, NULL),
(67, 10, 'SU6', 'Sushi crevettes', NULL, 2, 5, NULL),
(68, 10, 'SU7', 'Sushi poulpe', NULL, 2, 5.5, NULL),
(69, 10, 'SU8', 'Sushi saumon fromage', NULL, 2, 4.8, NULL),
(70, 10, 'SU9', 'Sushi camembert', NULL, 2, 4.5, NULL),
(71, 10, 'SU10', 'Sushi anguille grillée', NULL, 2, 5.5, NULL),
(72, 10, 'SU11', 'Sushi saumon avocat', NULL, 2, 5, NULL),

(73, 11, 'SA1', 'Sashimi saumon', NULL, 10, 8, NULL),
(74, 11, 'SA2', 'Sashimi thon', NULL, 10, 8.5, NULL),
(75, 11, 'SA3', 'Sashimi daurade', NULL, 10, 8, NULL),
(76, 11, 'SA4', 'Sashimi maquereau', NULL, 10, 7, NULL),
(77, 11, 'SA5', 'Sashimi poulpe', NULL, 10, 11, NULL),
(78, 11, 'SA6', 'Sashimi anguille grillée', NULL, 10, 11, NULL),
(79, 11, 'SA7', 'Assortillement de sashimi', NULL, 12, 11, NULL),

(80, 12, 'Y1', 'Brochette poulet', NULL, 2, 4, NULL),
(81, 12, 'Y2', 'Brochette boulettes de poulet', NULL, 2, 4, NULL),
(82, 12, 'Y3', 'Brochette aile de poulet', NULL, 2, 5, NULL),
(83, 12, 'Y4', 'Brochette boeuf', NULL, 2, 4.8, NULL),
(84, 12, 'Y5', 'Brochette boeuf au fromage', NULL, 2, 4.5, NULL),
(85, 12, 'Y6', 'Brochette maquereau', NULL, 2, 5.3, NULL),
(86, 12, 'Y7', 'Brochette gambas', NULL, 2, 6, NULL),
(87, 12, 'Y9', 'Brochette saumon', NULL, 2, 5.5, NULL),
(88, 12, 'Y10', 'Brochette thon', NULL, 2, 5.5, NULL),
(89, 12, 'Y11', 'Brochette champignons', NULL, 2, 4, NULL),
(90, 12, 'Y12', 'Brochette canard', NULL, 2, 5.5, NULL),

(91, 13, NULL, 'Ice tea', '33cl', 1, 1.5, NULL),
(92, 13, NULL, 'Fanta', '33cl', 1, 1.5, NULL),
(93, 13, NULL, 'Coca cola', '33cl', 1, 1.5, NULL),
(94, 13, NULL, 'Coca cola cherry', '33cl', 1, 2, NULL),
(95, 13, NULL, 'Jus de fruits', 'au choix: lychee, ananas, 25cl', 1, 2.8, NULL),
(96, 13, NULL, 'Kirin', 'sans alcool', 1, 3.9, NULL),

(97, 14, NULL, 'Asahi', '33cl', 1, 4, NULL),
(98, 14, NULL, 'Kirin', '33cl', 1, 4, NULL),

(99, 15, NULL, 'Côtes de provences', 'rosé, 37.5cl', 1, 7, NULL),
(100, 15, NULL, 'Muscadet', 'blanc, 37.5cl', 1, 8, NULL),
(101, 15, NULL, 'Côtes du Rhône', 'rouge, 37.5cl', 1, 8, NULL),

(102, 16, 'P1', 'Ramen', 'nouilles japonaises au boeuf, algue et légumes', 1, 9, NULL),
(103, 16, 'P2', 'Bobun', 'vermicelle de riz, boeuf, nems, salade variée', 1, 9, NULL),
(104, 16, 'P3', 'Soupe de raviolis japonais', '8 pièces', 1, 9, NULL),
(105, 16, 'P4', 'Nouilles sautées au boeuf', NULL, 1, 8, NULL),
(106, 16, 'P5', 'Nouilles sautées au crevettes', NULL, 1, 9, NULL),
(107, 16, 'P6', 'Boeuf sauté aux oignons', NULL, 1, 8, NULL),
(108, 16, 'P7', 'Crevettes à la sauce piquante', NULL, 1, 10.5, NULL),
(109, 16, 'P8', 'Vermicelles sautés au boeuf', NULL, 1, 8, NULL),
(110, 16, 'P9', 'Udon sauté aux légumes', NULL, 1, 8, NULL),
(111, 16, 'P10', 'Dame de saumon avec du riz', NULL, 1, 12, NULL),
(112, 16, 'P11', 'Nouilles sautées au fromage', NULL, 1, 8, NULL),

(113, 17, 'E15', 'Edamame', 'fève d''haricot', 1, 4.5, NULL),
(114, 17, 'E16', 'Salade d''algue piquante', NULL, 1, 4.5, NULL),
(115, 17, 'E17', 'Salade de saumon', NULL, 1, 7, NULL),
(116, 17, 'E18', 'Salade de crevettes', NULL, 1, 8, NULL),
(117, 17, 'E19', 'Salade de camembert', NULL, 1, 6, NULL),
(118, 17, 'E20', 'Capaccio de saumon', '10 pièces', 1, 9.5, NULL),

(119, 3, NULL, 'California thon avocat', NULL, 8, 5.5, NULL),
(120, 8, NULL, 'Maki printemps saumon', NULL, 8, 6.5, NULL),
(121, 8, NULL, 'Maki printemps thon', NULL, 8, 6.5, NULL),
(122, 8, NULL, 'Maki printemps fromage', NULL, 8, 6.5, NULL),
(123, 3, NULL, 'California futomaki', NULL, 8, 7.5, NULL),
(124, 6, NULL, 'Egg roll fromage', NULL, 8, 7, NULL),
(125, 9, NULL, 'Maki neige avocat', NULL, 8, 6, NULL),
(126, 3, NULL, 'California thon cuit', NULL, 8, 5.5, NULL),
(127, 8, NULL, 'Maki printemps avocat fromage', NULL, 8, 6.5, NULL),
(128, 1, NULL, 'Beignet de crevettes', NULL, 1, 6.5, NULL);

INSERT INTO menu (menu_id, category_id, menu_code, menu_name, menu_description, menu_price, menu_image) VALUES
(1, 1, 'E1', 'Riz nature', NULL, 2, NULL),
(2, 1, 'E2', 'Salade de choux', NULL, 3, NULL),
(3, 1, 'E3', 'Soupe miso', NULL, 2.5, NULL),
(4, 1, 'E4', 'Riz cantonais', NULL, 5.5, NULL),
(5, 1, 'E5', 'Riz vinaigré', NULL, 3, NULL),
(6, 1, 'E6', 'Riz sauté au curry et aux crevettes', NULL, 6.5, NULL),
(7, 1, 'E7', 'Gyoza', 'raviolis grillés', 6, NULL),
(8, 1, 'E8', 'Raviolis aux crevettes vapeur', NULL, 6, NULL),
(9, 1, 'E9', 'Nems au poulet', NULL, 6.5, NULL),
(10, 1, 'E10', 'Tempura crevettes', NULL, 10, NULL),
(11, 1, 'E11', 'Shaké tempura', 'beignet saumon', 10, NULL),
(12, 1, 'E12', 'Beignet poulet', NULL, 6.5, NULL),
(13, 1, 'E13', 'Beignet fromage', NULL, 6.5, NULL),
(14, 1, 'E14', 'Samoussa', NULL, 5.5, NULL),

(15, 1, 'MA1', 'Maki saumon', NULL, 5, NULL),
(16, 1, 'MA2', 'Maki thon', NULL, 5.5, NULL),
(17, 1, 'MA3', 'Maki anguille', NULL, 6, NULL),
(18, 1, 'MA4', 'Maki concombre', NULL, 4.5, NULL),
(19, 1, 'MA6', 'Maki avocat', NULL, 4.5, NULL),
(20, 1, 'MA7', 'Maki boeuf au fromage', NULL, 6, NULL),
(21, 1, 'MA8', 'Maki avocat fromage', NULL, 6, NULL),
(22, 1, 'MA9', 'Maki radis', NULL, 4.5, NULL),
(23, 1, 'MA10', 'Maki saumon fromage', NULL, 6, NULL),
(24, 1, 'MA11', 'Maki thon épicé', NULL, 5.5, NULL),
(25, 1, 'MA12', 'Futomaki', 'saumon, thon, avocat, surimi concombre, cheese', 7.5, NULL),
(26, 1, 'MA13', 'Futomaki végétarien', NULL, 6.5, NULL),
(27, 1, 'MA14', 'Temaki cornet au choix', 'thon, saumon, surimi, crevette, boeuf au fromage', 6.5, NULL),

(28, 1, 'MC1', 'California crevettes avocat mayonnaise', NULL, 5.5, NULL),
(29, 1, 'MC2', 'California saumon avocat', NULL, 5.5, NULL),
(30, 1, 'MC3', 'California surimi avocat', NULL, 5.5, NULL),
(31, 1, 'MC4', 'California thon cuit avocat mayonnaise', NULL, 5.5, NULL),
(32, 1, 'MC5', 'California Nigiri Las vegas couchée dune tranche de saumon', NULL, 6.2, NULL),
(33, 1, 'MC6', 'California croustillant poulet beignet', NULL, 6, NULL),
(34, 1, 'MC7', 'California tempura crevettes', NULL, 7, NULL),
(35, 1, 'MC9', 'California coriandre thon cuit', NULL, 6.5, NULL),
(36, 1, 'MC10', 'California Las vegas à la sauce épicée', NULL, 6.5, NULL),

(37, 1, 'MC11', 'Dragon roll saumon avocat', NULL, 8.5, NULL),
(38, 1, 'MC12', 'Dragon roll tempura crevettes à la sauce épicée', NULL, 9, NULL),
(39, 1, 'MC13', 'Dragon roll thon cuit avocat fromage', NULL, 8.5, NULL),

(40, 1, 'MC14', 'Croustillant saumon grillé', NULL, 7, NULL),
(41, 1, 'MC15', 'Croustillant tempura crevettes à la sauce épicée', NULL, 7.5, NULL),
(42, 1, 'MC16', 'Croustillant poulet épicée', NULL, 7, NULL),

(43, 1, 'MC18', 'Egg roll cheese avocat', NULL, 7, NULL),
(44, 1, 'MC19', 'Egg roll thon cuit avocat', NULL, 7, NULL),
(45, 1, 'MC20', 'Egg roll saumon grillé à la sauce sucré', NULL, 7, NULL),

(46, 1, 'MC21', 'Saumon roll saumon', NULL, 7, NULL),
(47, 1, 'MC22', 'Saumon roll fromage', NULL, 7, NULL),
(48, 1, 'MC23', 'Saumon roll fromage avocat', NULL, 7.5, NULL),
(49, 1, 'MC24', 'Saumon roll fromage concombre', NULL, 7.5, NULL),
(50, 1, 'MC25', 'Saumon roll thon cuit', NULL, 7, NULL),

(51, 1, 'MC26', 'Maki printemps fromage concombre', NULL, 6.5, NULL),
(52, 1, 'MC27', 'Maki printemps fromage saumon', NULL, 6.5, NULL),
(53, 1, 'MC28', 'Maki printemps thon rouge avocat', NULL, 7, NULL),
(54, 1, 'MC29', 'Maki printemps crevettes', NULL, 7, NULL),
(55, 1, 'MC30', 'Maki printemps thon cuit', NULL, 7, NULL),
(56, 1, 'MC31', 'Maki printemps tempura crevettes à la sauce épicée', NULL, 7, NULL),

(57, 1, 'MC32', 'Maki neige saumon', NULL, 6, NULL),
(58, 1, 'MC33', 'Maki neige thon', NULL, 6, NULL),
(59, 1, 'MC34', 'Maki neige thon cuit', NULL, 6, NULL),
(60, 1, 'MC35', 'Maki neige tempura crevettes', NULL, 6.5, NULL),
(61, 1, 'MC36', 'Maki neige fromage', NULL, 6, NULL),

(62, 1, 'SU1', 'Sushi saumon', NULL, 4.5, NULL),
(63, 1, 'SU2', 'Sushi thon', NULL, 4.5, NULL),
(64, 1, 'SU3', 'Sushi daurade', NULL, 4.5, NULL),
(65, 1, 'SU4', 'Sushi avocat', NULL, 4.5, NULL),
(66, 1, 'SU5', 'Sushi maquereau', NULL, 4.5, NULL),
(67, 1, 'SU6', 'Sushi crevettes', NULL, 5, NULL),
(68, 1, 'SU7', 'Sushi poulpe', NULL, 5.5, NULL),
(69, 1, 'SU8', 'Sushi saumon fromage', NULL, 4.8, NULL),
(70, 1, 'SU9', 'Sushi camembert', NULL, 4.5, NULL),
(71, 1, 'SU10', 'Sushi anguille grillée', NULL, 5.5, NULL),
(72, 1, 'SU11', 'Sushi saumon avocat', NULL, 5, NULL),

(73, 1, 'SA1', 'Sashimi saumon', NULL, 8, NULL),
(74, 1, 'SA2', 'Sashimi thon', NULL, 8.5, NULL),
(75, 1, 'SA3', 'Sashimi daurade', NULL, 8, NULL),
(76, 1, 'SA4', 'Sashimi maquereau', NULL, 7, NULL),
(77, 1, 'SA5', 'Sashimi poulpe', NULL, 11, NULL),
(78, 1, 'SA6', 'Sashimi anguille grillée', NULL, 11, NULL),
(79, 1, 'SA7', 'Assortillement de sashimi', NULL, 11, NULL),

(80, 1, 'Y1', 'Brochette poulet', NULL, 4, NULL),
(81, 1, 'Y2', 'Brochette boulettes de poulet', NULL, 4, NULL),
(82, 1, 'Y3', 'Brochette aile de poulet', NULL, 5, NULL),
(83, 1, 'Y4', 'Brochette boeuf', NULL, 4.8, NULL),
(84, 1, 'Y5', 'Brochette boeuf au fromage', NULL, 4.5, NULL),
(85, 1, 'Y6', 'Brochette maquereau', NULL, 5.3, NULL),
(86, 1, 'Y7', 'Brochette gambas', NULL, 6, NULL),
(87, 1, 'Y9', 'Brochette saumon', NULL, 5.5, NULL),
(88, 1, 'Y10', 'Brochette thon', NULL, 5.5, NULL),
(89, 1, 'Y11', 'Brochette champignons', NULL, 4, NULL),
(90, 1, 'Y12', 'Brochette canard', NULL, 5.5, NULL),

(91, 1, NULL, 'Ice tea', '33cl', 1.5, NULL),
(92, 1, NULL, 'Fanta', '33cl', 1.5, NULL),
(93, 1, NULL, 'Coca cola', '33cl', 1.5, NULL),
(94, 1, NULL, 'Coca cola cherry', '33cl', 2, NULL),
(95, 1, NULL, 'Jus de fruits', 'au choix: lychee, ananas, 25cl', 2.8, NULL),
(96, 1, NULL, 'Kirin', 'sans alcool', 3.9, NULL),

(97, 1, NULL, 'Asahi', '33cl', 4, NULL),
(98, 1, NULL, 'Kirin', '33cl', 4, NULL),

(99, 1, NULL, 'Côtes de provences', 'rosé, 37.5cl', 7, NULL),
(100, 1, NULL, 'Muscadet', 'blanc, 37.5cl', 8, NULL),
(101, 1, NULL, 'Côtes du Rhône', 'rouge, 37.5cl', 8, NULL),

(102, 1, 'P1', 'Ramen', 'nouilles japonaises au boeuf, algue et légumes', 9, NULL),
(103, 1, 'P2', 'Bobun', 'vermicelle de riz, boeuf, nems, salade variée', 9, NULL),
(104, 1, 'P3', 'Soupe de raviolis japonais', '8 pièces', 9, NULL),
(105, 1, 'P4', 'Nouilles sautées au boeuf', NULL, 8, NULL),
(106, 1, 'P5', 'Nouilles sautées au crevettes', NULL, 9, NULL),
(107, 1, 'P6', 'Boeuf sauté aux oignons', NULL, 8, NULL),
(108, 1, 'P7', 'Crevettes à la sauce piquante', NULL, 10.5, NULL),
(109, 1, 'P8', 'Vermicelles sautés au boeuf', NULL, 8, NULL),
(110, 1, 'P9', 'Udon sauté aux légumes', NULL, 8, NULL),
(111, 1, 'P10', 'Dame de saumon avec du riz', NULL, 12, NULL),
(112, 1, 'P11', 'Nouilles sautées au fromage', NULL, 8, NULL),

(113, 1, 'E15', 'Edamame', 'fève d''haricot', 4.5, NULL),
(114, 1, 'E16', 'Salade d''algue piquante', NULL, 4.5, NULL),
(115, 1, 'E17', 'Salade de saumon', NULL, 7, NULL),
(116, 1, 'E18', 'Salade de crevettes', NULL, 8, NULL),
(117, 1, 'E19', 'Salade de camembert', NULL, 6, NULL),
(118, 1, 'E20', 'Capaccio de saumon', '10 pièces', 9.5, NULL),

(119, 2, 'A1', 'Menu A1', NULL, 13, NULL),
(120, 2, 'A2', 'Menu A2', NULL, 14, NULL),
(121, 2, 'A3', 'Menu A3', NULL, 15, NULL),
(122, 2, 'A4', 'Menu A4', NULL, 16, NULL),
(123, 2, 'A5', 'Menu A5', NULL, 17, NULL),
(124, 2, 'A6', 'Menu A6', NULL, 18, NULL),
(125, 2, 'A7', 'Menu A7', NULL, 19, NULL),
(126, 2, 'A8', 'Menu A8', NULL, 20, NULL),
(127, 2, 'A9', 'Menu A9', NULL, 21, NULL),
(128, 2, 'A10', 'Menu A10', NULL, 22, NULL),
(129, 2, 'A11', 'Menu A11', NULL, 23, NULL),
(130, 2, 'A12', 'Menu A12', NULL, 24, NULL),

(131, 3, 'S1', 'Menu S1', 'saumon cru sur un bol de riz vinaigré + avocat', 13, NULL),
(132, 3, 'S2', 'Menu S2', 'anguille grillée sur un bol de riz vinaigré', 16, NULL),
(133, 3, 'S3', 'Menu S3', 'poisson mixte ou thon ou saumon et thon sur un bol de riz vinaigré', 15, NULL),
(134, 3, NULL, 'Omelette', 'chirashi omelette ou beignets poulets', 12, NULL),

(135, 4, 'PK1', 'Poké au poulet', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, oignons frits, poulet frits', 14.9, NULL),
(136, 4, 'PK2', 'Poké au boeuf', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, oignons frits, boeuf sauté', 14.9, NULL),
(137, 4, 'PK3', 'Poké au saumon', 'Garnitures : Riz vinaigré, carotte rapée, avocat, algue marinée, omelette, saumon cru', 14.9, NULL),
(138, 4, 'PK4', 'Poké végétarien', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, radis jaune mariné, avocat, algue marinée', 13.5, NULL),

(139, 5, '1', 'Menu 1', NULL, 8, NULL),
(140, 5, '2', 'Menu 2', NULL, 9, NULL),
(141, 5, '3', 'Menu 3', NULL, 9, NULL),
(142, 5, '4', 'Menu 4', NULL, 9.5, NULL),
(143, 5, '5', 'Menu 5', NULL, 13, NULL),
(144, 5, '6', 'Menu 6', NULL, 13, NULL),
(145, 5, '7', 'Menu 7', NULL, 11, NULL),
(146, 5, '8', 'Menu 8', NULL, 11, NULL),

(147, 6, '9', 'Menu 9', NULL, 15, NULL),
(148, 6, '10', 'Menu 10', NULL, 15.5, NULL),
(149, 6, '11', 'Menu 11', NULL, 10.5, NULL),
(150, 6, '12', 'Menu 12', NULL, 16.9, NULL),
(151, 6, 'V', 'Menu végétarien', NULL, 14, NULL),

(152, 7, 'S4', 'Menu S4', NULL, 16, NULL),
(153, 7, 'S5', 'Menu S5', NULL, 21, NULL),
(154, 7, 'S6', 'Menu S6', NULL, 17, NULL),
(155, 7, 'S7', 'Menu S7', NULL, 14, NULL),
(156, 7, 'S8', 'Menu S8', NULL, 14.5, NULL),
(157, 7, 'S9', 'Menu S9', NULL, 15, NULL),
(158, 7, 'S10', 'Menu S10', NULL, 17.5, NULL),
(159, 7, 'S11', 'Menu S11', '4 saumons et 4 thons / 8 saumons', 13.5, NULL),
(160, 7, 'S12', 'Menu S12', NULL, 16, NULL),
(161, 7, 'S13', 'Menu S13', NULL, 18, NULL),
(162, 7, 'S14', 'Menu S14', NULL, 15, NULL),
(163, 7, 'S15', 'Menu S15', NULL, 16.5, NULL),
(164, 7, 'S16', 'Menu S16', NULL, 18, NULL),
(165, 7, 'S17', 'Menu S17', NULL, 16.5, NULL),
(166, 7, 'S18', 'Menu S18', NULL, 19, NULL),
(167, 7, 'S19', 'Menu S19', NULL, 15, NULL),

(168, 8, 'BT1', 'Menu BT1', NULL, 18, NULL),
(169, 8, 'BT2', 'Menu BT2', NULL, 19, NULL),
(170, 8, 'BT3', 'Menu BT3', NULL, 20, NULL),

(171, 9, 'F1', 'Menu F1', 'Boissons au choix: jus de lychee, coca cola ; Dessert au choix : lychees, nougat ou une boule de glace', 8.9, NULL),
(172, 9, 'F2', 'Menu F1', 'Boissons au choix: jus de lychee, coca cola ; Dessert au choix : lychees, nougat ou une boule de glace', 8.9, NULL),

(173, 10, NULL, 'Menu valentin', 'pour 2 pers.', 39.90, NULL),
(174, 10, NULL, 'Menu yamayoshi', 'pour 2-3 pers.', 55, NULL),
(175, 10, NULL, 'Menu royal', 'pour 4-5 pers.', 72, NULL),
(176, 10, NULL, 'Menu royal+', 'pour 4-5 pers.', 82, NULL);


INSERT INTO menu_food (menu_id, food_id, food_type_id, quantity) VALUES
(1, 1, NULL, 1),
(2, 2, NULL, 1),
(3, 3, NULL, 1),
(4, 4, NULL, 1),
(5, 5, NULL, 1),
(6, 6, NULL, 1),
(7, 7, NULL, 1),
(8, 8, NULL, 1),
(9, 9, NULL, 1),
(10, 10, NULL, 1),
(11, 11, NULL, 1),
(12, 12, NULL, 1),
(13, 13, NULL, 1),
(14, 14, NULL, 1),

(15, 15, NULL, 1),
(16, 16, NULL, 1),
(17, 17, NULL, 1),
(18, 18, NULL, 1),
(19, 19, NULL, 1),
(20, 20, NULL, 1),
(21, 21, NULL, 1),
(22, 22, NULL, 1),
(23, 23, NULL, 1),
(24, 24, NULL, 1),
(25, 25, NULL, 1),
(26, 26, NULL, 1),
(27, 27, NULL, 1),

(28, 28, NULL, 1),
(29, 29, NULL, 1),
(30, 30, NULL, 1),
(31, 31, NULL, 1),
(32, 32, NULL, 1),
(33, 33, NULL, 1),
(34, 34, NULL, 1),
(35, 35, NULL, 1),
(36, 36, NULL, 1),

(37, 37, NULL, 1),
(38, 38, NULL, 1),
(39, 39, NULL, 1),

(40, 40, NULL, 1),
(41, 41, NULL, 1),
(42, 42, NULL, 1),

(43, 43, NULL, 1),
(44, 44, NULL, 1),
(45, 45, NULL, 1),

(46, 46, NULL, 1),
(47, 47, NULL, 1),
(48, 48, NULL, 1),
(49, 49, NULL, 1),
(50, 50, NULL, 1),

(51, 51, NULL, 1),
(52, 52, NULL, 1),
(53, 53, NULL, 1),
(54, 54, NULL, 1),
(55, 55, NULL, 1),
(56, 56, NULL, 1),

(57, 57, NULL, 1),
(58, 58, NULL, 1),
(59, 59, NULL, 1),
(60, 60, NULL, 1),
(61, 61, NULL, 1),

(62, 62, NULL, 1),
(63, 63, NULL, 1),
(64, 64, NULL, 1),
(65, 65, NULL, 1),
(66, 66, NULL, 1),
(67, 67, NULL, 1),
(68, 68, NULL, 1),
(69, 69, NULL, 1),
(70, 70, NULL, 1),
(71, 71, NULL, 1),
(72, 72, NULL, 1),

(73, 73, NULL, 1),
(74, 74, NULL, 1),
(75, 75, NULL, 1),
(76, 76, NULL, 1),
(77, 77, NULL, 1),
(78, 78, NULL, 1),
(79, 79, NULL, 1),

(80, 80, NULL, 1),
(81, 81, NULL, 1),
(82, 82, NULL, 1),
(83, 83, NULL, 1),
(84, 84, NULL, 1),
(85, 85, NULL, 1),
(86, 86, NULL, 1),
(87, 87, NULL, 1),
(88, 88, NULL, 1),
(89, 89, NULL, 1),
(90, 90, NULL, 1),

(91, 91, NULL, 1),
(92, 92, NULL, 1),

(93, 93, NULL, 1),
(94, 94, NULL, 1),
(95, 95, NULL, 1),
(96, 96, NULL, 1),

(97, 97, NULL, 1),
(98, 98, NULL, 1),

(99, 99, NULL, 1),
(100, 100, NULL, 1),
(101, 101, NULL, 1),

(102, 102, NULL, 1),
(103, 103, NULL, 1),
(104, 104, NULL, 1),
(105, 105, NULL, 1),
(106, 106, NULL, 1),
(107, 107, NULL, 1),
(108, 108, NULL, 1),
(109, 109, NULL, 1),
(110, 110, NULL, 1),
(111, 111, NULL, 1),
(112, 112, NULL, 1),

(113, 113, NULL, 1),
(114, 114, NULL, 1),
(115, 115, NULL, 1),
(116, 116, NULL, 1),
(117, 117, NULL, 1),
(118, 118, NULL, 1),

(119, 3, NULL, 1),
(119, 2, NULL, 1),
(119, 1, NULL, 1),
(119, 9, NULL, 4),
(119, NULL, 12, 5),

(120, 3, NULL, 1),
(120, 2, NULL, 1),
(120, 1, NULL, 1),
(120, 7, NULL, 1),
(120, NULL, 12, 5),

(121, 3, NULL, 1),
(121, 2, NULL, 1),
(121, 1, NULL, 1),
(121, 34, NULL, 8),
(121, NULL, 12, 5),

(122, 3, NULL, 1),
(122, 2, NULL, 1),
(122, 1, NULL, 1),
(122, 119, NULL, 8),
(122, 29, NULL, 8),
(122, NULL, 12, 5),

(123, 3, NULL, 1),
(123, 2, NULL, 1),
(123, 1, NULL, 1),
(123, 12, NULL, 1),
(123, NULL, 12, 5),

(124, 3, NULL, 1),
(124, 2, NULL, 1),
(124, 1, NULL, 1),
(122, 29, NULL, 8),
(124, NULL, 12, 5),


(125, 3, NULL, 1),
(125, 2, NULL, 1),
(125, 1, NULL, 1),
(125, NULL, 10, 6),
(125, NULL, 12, 5),

(126, 3, NULL, 1),
(126, 2, NULL, 1),
(126, 1, NULL, 1),
(126, NULL, 11, 12),
(126, NULL, 12, 5),

(127, 3, NULL, 1),
(127, 2, NULL, 1),
(127, 1, NULL, 1),
(127, 32, NULL, 8),
(127, NULL, 12, 5),

(128, 3, NULL, 1),
(128, 2, NULL, 1),
(128, 1, NULL, 1),
(128, 15, NULL, 6),
(128, 62, NULL, 2),
(128, NULL, 11, 8),
(128, 87, NULL, 2),
(128, 88, NULL, 2),

(129, 3, NULL, 1),
(129, 2, NULL, 1),
(129, 1, NULL, 1),
(128, 15, NULL, 6),
(128, 73, NULL, 3),
(129, 84, NULL, 5),

(130, 3, NULL, 1),
(130, 2, NULL, 1),
(130, 1, NULL, 1),
(130, 61, NULL, 8),
(130, 69, NULL, 2),
(130, 84, NULL, 5),

(131, 3, NULL, 1),
(131, 2, NULL, 1),

(132, 3, NULL, 1),
(132, 2, NULL, 1),

(133, 3, NULL, 1),
(133, 2, NULL, 1),

(139, 3, NULL, 1),
(139, 2, NULL, 1),
(139, 1, NULL, 1), 
(139, 80, NULL, 2),
(139, 81, NULL, 2),

(140, 3, NULL, 1),
(140, 2, NULL, 1),
(140, 1, NULL, 1), 
(140, 73, NULL, 4),
(140, 74, NULL, 4),

(141, 3, NULL, 1),
(141, 2, NULL, 1),
(141, 62, NULL, 4),
(141, NULL, 2, 6),

(142, 3, NULL, 1),
(142, 2, NULL, 1),
(142, 1, NULL, 1), 
(142, NULL, 3, 4),
(142, NULL, 10, 2),
(142, 81, NULL, 1),
(142, 84, NULL, 1),

(143, 3, NULL, 1),
(143, 2, NULL, 1),
(143, 1, NULL, 1), 
(143, 15, NULL, 6),
(143, 84, NULL, 2),
(143, 83, NULL, 2),

(144, 3, NULL, 1),
(144, 2, NULL, 1),
(144, 1, NULL, 1), 
(144, 62, NULL, 2),
(144, NULL, 8, 8),
(144, 84, NULL, 2),

(145, 3, NULL, 1),
(145, 2, NULL, 1),
(145, 1, NULL, 1), 
(145, 84, NULL, 2),
(145, 83, NULL, 2),

(146, 3, NULL, 1),
(146, 2, NULL, 1),
(146, 1, NULL, 1), 
(146, 84, NULL, 5),

(147, 3, NULL, 1),
(147, 2, NULL, 1),
(147, 1, NULL, 1), 
(147, 87, NULL, 3),
(147, 88, NULL, 2),

(148, 3, NULL, 1),
(148, 2, NULL, 1),
(148, 1, NULL, 1), 
(148, 81, NULL, 1),
(148, 80, NULL, 1),
(148, 82, NULL, 1),
(148, 90, NULL, 1),
(148, 84, NULL, 1),
(148, 83, NULL, 1),
(148, 89, NULL, 1),

(149, 3, NULL, 1),
(149, 2, NULL, 1),
(149, 1, NULL, 1), 
(149, 81, NULL, 1),
(149, 80, NULL, 1),
(149, 82, NULL, 1),
(149, 84, NULL, 1),
(149, 83, NULL, 1),

(150, 3, NULL, 1),
(150, 2, NULL, 1),
(150, 1, NULL, 1), 
(150, 81, NULL, 1),
(150, 82, NULL, 1),
(150, 84, NULL, 1),
(150, 83, NULL, 1),
(150, 87, NULL, 2),
(150, 86, NULL, 2),

(151, 3, NULL, 1),
(151, 2, NULL, 1),
(151, 1, NULL, 1), 
(151, 22, NULL, 6),
(151, 18, NULL, 6),
(151, 65, NULL, 2),
(151, 89, NULL, 2),

(152, 3, NULL, 1),
(152, 2, NULL, 1),
(152, 1, NULL, 1), 
(152, NULL, 11, 16),

(153, 3, NULL, 1),
(153, 2, NULL, 1),
(153, 1, NULL, 1), 
(153, NULL, 11, 24),

(154, 3, NULL, 1),
(154, 2, NULL, 1),
(154, 1, NULL, 1), 
(154, 120, NULL, 8),
(154, 121, NULL, 8),
(154, 122, NULL, 8),

(155, 3, NULL, 1),
(155, 2, NULL, 1),
(155, 123, NULL, 10),

(156, 3, NULL, 1),
(156, 2, NULL, 1),
(156, 32, NULL, 16),

(157, 3, NULL, 1),
(157, 2, NULL, 1),
(157, 47, NULL, 8),
(157, NULL, 8, 8),
(157, 69, NULL, 2),

(158, 3, NULL, 1),
(158, 2, NULL, 1),
(158, 1, NULL, 1),
(158, 47, NULL, 8),
(158, 73, NULL, 6),
(158, 69, NULL, 4),

(159, 3, NULL, 1),
(159, 2, NULL, 1),
(159, NULL, 10, 8),

(160, 3, NULL, 1),
(160, 2, NULL, 1),
(160, NULL, 10, 8),
(160, 15, NULL, 6),

(161, 3, NULL, 1),
(161, 2, NULL, 1),
(161, 1, NULL, 1),
(161, 62, NULL, 4),
(161, 73, NULL, 9),
(161, 29, NULL, 8),

(162, 3, NULL, 1),
(162, 2, NULL, 1),
(162, 29, NULL, 8),
(162, 62, NULL, 4),
(162, 63, NULL, 2),

(163, 3, NULL, 1),
(163, 2, NULL, 1),
(163, 1, NULL, 1),
(163, 47, NULL, 8),
(163, 73, NULL, 9),

(164, 3, NULL, 1),
(164, 2, NULL, 1),
(164, 124, NULL, 8),
(164, 125, NULL, 8),
(164, 35, NULL, 8),

(165, 3, NULL, 1),
(165, 2, NULL, 1),
(165, 29, NULL, 8),
(165, 47, NULL, 8),
(165, 120, NULL, 8),

(166, 3, NULL, 1),
(166, 2, NULL, 1),
(166, 15, NULL, 6),
(166, 29, NULL, 8),
(166, 47, NULL, 8),
(166, 120, NULL, 8),

(167, 3, NULL, 1),
(167, 2, NULL, 1),
(167, 15, NULL, 8),
(167, 16, NULL, 8),
(167, 29, NULL, 8),


(168, 3, NULL, 1),
(168, 2, NULL, 1),
(168, 1, NULL, 1),
(168, 7, NULL, 3),
(168, NULL, 10, 3),
(168, NULL, 11, 6),
(168, 80, NULL, 1),
(168, 81, NULL, 1),
(168, 84, NULL, 1),

(169, 3, NULL, 1),
(169, 2, NULL, 1),
(169, 1, NULL, 1),
(169, 12, NULL, 8),
(169, 9, NULL, 3),
(169, 108, NULL, 1),
(169, 84, NULL, 3),

(170, 3, NULL, 1),
(170, 2, NULL, 1),
(170, 1, NULL, 1),
(170, 126, NULL, 8),
(170, 127, NULL, 8),
(170, 128, NULL, 3),
(170, 109, NULL, 1),

(171, 80, NULL, 2),
(171, 84, NULL, 2),

(172, 73, NULL, 4),

(173, 3, NULL, 2),
(173, 2, NULL, 2),
(173, 1, NULL, 2),
(173, 29, NULL, 8),
(173, NULL, 10, 6),
(173, NULL, 11, 16),
(173, 80, NULL, 2),
(173, 81, NULL, 2),
(173, 84, NULL, 2),

(174, 3, NULL, 2),
(174, 2, NULL, 2),
(174, 1, NULL, 2),
(174, 62, NULL, 8),
(174, 63, NULL, 4),
(174, 67, NULL, 4),
(174, 15, NULL, 6),
(174, NULL, 8, 6),
(174, 29, NULL, 6),
(174, 47, NULL, 6),
(174, 73, NULL, 8),
(174, 74, NULL, 8),

(175, 62, NULL, 16),
(175, 63, NULL, 5),
(175, 67, NULL, 5),
(175, NULL, 2, 18),
(175, NULL, 3, 36),

(176, 62, NULL, 16),
(176, 63, NULL, 5),
(176, 67, NULL, 5),
(176, NULL, 2, 18),
(176, NULL, 3, 36),
(176, 81, NULL, 2),
(176, 84, NULL, 4),
(176, 83, NULL, 2),
(176, 80, NULL, 2);