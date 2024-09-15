DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS food CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS menu_food CASCADE;
DROP TABLE IF EXISTS food_types CASCADE;

CREATE TABLE menu_categories (
category_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
category_title TEXT NOT NULL,
category_letter TEXT NULL);

CREATE TABLE food (
food_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
type_id INTEGER NOT NULL,
food_code TEXT NOT NULL UNIQUE,
food_name TEXT NOT NULL,
food_description TEXT NULL,
serving_quantity INTEGER DEFAULT 1,
food_price MONEY NOT NULL,
food_image TEXT NULL);

CREATE TABLE menu (
menu_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
category_id INTEGER NOT NULL,
menu_code TEXT NOT NULL UNIQUE,
menu_name INTEGER NOT NULL,
menu_description TEXT NULL,
menu_price MONEY NOT NULL,
menu_image INTEGER NULL);

CREATE TABLE menu_food (
menu_id INTEGER NOT NULL,
food_id INTEGER NOT NULL,
quantity INTEGER NOT NULL);

CREATE TABLE food_types (
type_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
type_title TEXT NOT NULL,
type_code TEXT NOT NULL,
serving_quantity INTEGER NULL DEFAULT 1);

ALTER TABLE food ADD CONSTRAINT food_type_id_food_types_type_id FOREIGN KEY (type_id) REFERENCES food_types(type_id);
ALTER TABLE menu ADD CONSTRAINT menu_category_id_menu_categories_category_id FOREIGN KEY (category_id ) REFERENCES menu_categories(category_id);
ALTER TABLE menu_food ADD CONSTRAINT menu_food_menu_id_menu_menu_id FOREIGN KEY (menu_id) REFERENCES menu(menu_id);
ALTER TABLE menu_food ADD CONSTRAINT menu_food_food_id_food_food_id FOREIGN KEY (food_id) REFERENCES food(food_id);

INSERT INTO food_types (type_id, type_title, type_code, serving_quantity) VALUES
(1, 'Starter', 'E', 1),
(2, 'Maki', 'MA', 6),
(3, 'California maki', 'MC', 8),
(4, 'Dragon roll', 'MC', 8),
(5, 'Coustillant', 'MC', 8),
(6, 'Egg roll', 'MC', 8),
(7, 'Salmon roll', 'MC', 8),
(8, 'Maki neige', 'MC', 8),
(9, 'Maki printemps', 'MC', 8),
(10, 'Sushi', 'SU', 2),
(11, 'Sashimi', 'SA', 10),
(12, 'Skewer', 'Y', 2),
(13, 'Drinks', NULL, 1),
(14, 'Beer', NULL, 1),
(15, 'Wine', NULL, 1),
(16, 'Salade Yamayoshi', 'E', 1),

INSERT INTO menu_categories (category_id, category_title, category_letter) VALUES
(1, 'À la carte', NULL),
(2, 'Menus mixtes', 'A'),
(3, 'Plats chauds', 'P'),
(4, 'Menus chirashi', 'S'),
(5, 'Poké bowl', 'PK'),
(6, 'Menus express', NULL),
(7, 'Menus', NULL),
(8, NULL, NULL),
(9, 'Menu bento', 'BT'),
(10, 'Menu enfant', 'F'),
(11, 'Nos familles', NULL),

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
(13, 1, 'E13', 'Beignet fromage', NULL, NULL, 6.5, NULL),
(14, 1, 'E14', 'Samoussa', NULL, NULL, 3, NULL),

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
(32, 3, 'MC5', "California Nigiri Las vegas couchée d'une tranche de saumon", NULL, 8, 6.2, NULL),
(33, 3, 'MC6', 'California croustillant poulet beignet', NULL, 8, 6, NULL),
(34, 3, 'MC7', 'California tempura crevettes', NULL, 8, 7, NULL),
(34, 3, 'MC9', 'California coriandre thon cuit', NULL, 8, 6.5, NULL),
(35, 3, 'MC10', 'California Las vegas à la sauce épicée', NULL, 8, 6.5, NULL),

