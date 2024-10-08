-- Drop existing tables
DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS food CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS menu_food CASCADE;
DROP TABLE IF EXISTS food_types CASCADE;

-- Create table for menu categories
CREATE TABLE menu_categories (
  id SERIAL PRIMARY KEY,  -- Use SERIAL for auto-increment integer IDs
  title TEXT NULL,
  letter TEXT NULL
);

-- Create table for food types
CREATE TABLE food_types (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  code TEXT NULL,
  serving_quantity INTEGER DEFAULT 1,
  image TEXT NULL
);

-- Create table for food
CREATE TABLE food (
  id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL REFERENCES food_types(id),  -- Foreign key to food_types table
  code TEXT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NULL,
  serving_quantity INTEGER DEFAULT 1,
  price DECIMAL(19, 4) NOT NULL,
  image TEXT NULL
);

-- Create table for menu
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES menu_categories(id),  -- Foreign key to menu_categories table
  code TEXT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NULL,
  price DECIMAL(19, 4) NOT NULL,
  image TEXT NULL
);

-- Create table for menu_food
CREATE TABLE menu_food (
  menu_id INTEGER NOT NULL REFERENCES menu(id),  -- Foreign key to menu table
  food_id INTEGER NULL REFERENCES food(id),  -- Foreign key to food table
  food_type_id INTEGER NULL REFERENCES food_types(id),  -- Foreign key to food_types table
  quantity INTEGER NOT NULL,
  PRIMARY KEY (menu_id, food_id, food_type_id)  -- Composite primary key
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_food ENABLE ROW LEVEL SECURITY;

-- Create Policies for RLS
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

-- Insert data into food_types
INSERT INTO food_types (title, code, serving_quantity, image) VALUES
('Entrée', 'E', 1, NULL),
('Maki', 'MA', 6, 'maki-saumon.jpg'),
('California maki', 'MC', 8, 'california-saumon-avocat'),
('Dragon roll', 'MC', 8, NULL),
('Croustillant', 'MC', 8, NULL),
('Egg roll', 'MC', 8, 'egg-roll-cheese-avocat.jpg'),
('Saumon roll', 'MC', 8, 'saumon-roll-avocat-cheese.jpg'),
('Maki printemps', 'MC', 8, 'spring-roll-saumon-avocat'),
('Maki neige', 'MC', 8, NULL),
('Sushi', 'SU', 2, 'sushi-saumon.jpg'),
('Sashimi', 'SA', 10, 'sashimi-assortiments.jpg'),
('Brochettes', 'Y', 2, 'brochette-poulet.jpg'),
('Boissons', NULL, 1, NULL),
('Bière', NULL, 1, NULL),
('Vin', NULL, 1, NULL),
('Plats chauds', 'P', 1, NULL),
('Salade Yamayoshi', 'E', 1, 'edamame.jpg');

-- Insert data into menu_categories
INSERT INTO menu_categories (title, letter) VALUES
('À la carte', NULL),
('Menus mixtes', 'A'),
('Menus chirashi', 'S'),
('Poké bowl', 'PK'),
('Menus express', NULL),
('Menus', NULL),
(NULL, NULL),
('Menu bento', 'BT'),
('Menu enfant', 'F'),
('Nos familles', NULL);

-- Insert data into food
INSERT INTO food (type_id, code, name, description, serving_quantity, price, image) VALUES
(1, 'E1', 'Riz nature', NULL, 1, 2, 'riz-nature.jpg'),
(1, 'E2', 'Salade de choux', NULL, 1, 3, 'salade-de-choux.jpg'),
(1, 'E3', 'Soupe miso', NULL, 1, 2.5, 'soupe-miso.jpg'),
(1, 'E4', 'Riz cantonais', NULL, 1, 5.5, NULL),
(1, 'E5', 'Riz vinaigré', NULL, 1, 3, 'riz-vinaigre.jpg'),
(1, 'E6', 'Riz sauté au curry et aux crevettes', NULL, 1, 6.5, NULL),
(1, 'E7', 'Gyoza', 'raviolis grillés', 6, 6, 'gyoza.jpg'),
(1, 'E8', 'Raviolis aux crevettes vapeur', NULL, 6, 6, NULL),
(1, 'E9', 'Nems au poulet', NULL, 6, 6.5, 'nems-poulet.jpg'),
(1, 'E10', 'Tempura crevettes', NULL, NULL, 10, 'tempura-crevette.jpg'),
(1, 'E11', 'Shaké tempura', 'beignet saumon', NULL, 10, NULL),
(1, 'E12', 'Beignet poulet', NULL, NULL, 6.5, 'beignet-poulet.jpg'),
(1, 'E13', 'Beignet fromage', NULL, 6, 6.5, NULL),
(1, 'E14', 'Samoussa', NULL, 3, 5.5, NULL),

(2, 'MA1', 'Maki saumon', NULL, 6, 5, 'maki-saumon.jpg'),
(2, 'MA2', 'Maki thon', NULL, 6, 5.5, 'maki-thon.jpg'),
(2, 'MA3', 'Maki anguille', NULL, 6, 6, NULL),
(2, 'MA4', 'Maki concombre', NULL, 6, 4.5, 'maki-concombre.jpg'),
(2, 'MA6', 'Maki avocat', NULL, 6, 4.5, 'maki-avocat.jpg'),
(2, 'MA7', 'Maki boeuf au fromage', NULL, 6, 6, NULL),
(2, 'MA8', 'Maki avocat fromage', NULL, 6, 6, NULL),
(2, 'MA9', 'Maki radis', NULL, 6, 4.5, NULL),
(2, 'MA10', 'Maki saumon fromage', NULL, 6, 6, NULL),
(2, 'MA11', 'Maki thon épicé', NULL, 6, 5.5, NULL),
(2, 'MA12', 'Futomaki', 'saumon, thon, avocat, surimi concombre, cheese', 6, 7.5, NULL),
(2, 'MA13', 'Futomaki végétarien', NULL, 5, 6.5, NULL),
(2, 'MA14', 'Temaki cornet au choix', 'thon, saumon, surimi, crevette, boeuf au fromage', 2, 6.5, 'temaki-saumon.jpg'),

(3, 'MC1', 'California crevettes avocat mayonnaise', NULL, 8, 5.5, 'california-crevettes-avocat-mayonnaise.jpg'),
(3, 'MC2', 'California saumon avocat', NULL, 8, 5.5, 'california-saumon-avocat.jpg'),
(3, 'MC3', 'California surimi avocat', NULL, 8, 5.5, 'california-surimi-avocat.jpg'),
(3, 'MC4', 'California thon cuit avocat mayonnaise', NULL, 8, 5.5, NULL),
(3, 'MC5', 'California Nigiri Las vegas', NULL, 8, 6.2, 'california-nigiri.jpg'),
(3, 'MC6', 'California croustillant poulet beignet', NULL, 8, 6, NULL),
(3, 'MC7', 'California tempura crevettes', NULL, 8, 7, 'california-tempura-crevette.jpg'),
(3, 'MC9', 'California coriandre thon cuit', NULL, 8, 6.5, NULL),
(3, 'MC10', 'California Las vegas à la sauce épicée', NULL, 8, 6.5, 'california-nigiri.jpg'),

(4, 'MC11', 'Dragon roll saumon avocat', NULL, 8, 8.5, NULL),
(4, 'MC12', 'Dragon roll tempura crevettes à la sauce épicée', NULL, 8, 9, NULL),
(4, 'MC13', 'Dragon roll thon cuit avocat fromage', NULL, 8, 8.5, NULL),

(5, 'MC14', 'Croustillant saumon grillé', NULL, 8, 7, NULL),
(5, 'MC15', 'Croustillant tempura crevettes à la sauce épicée', NULL, 8, 7.5, NULL),
(5, 'MC16', 'Croustillant poulet épicée', NULL, 8, 7, NULL),

(6, 'MC18', 'Egg roll cheese avocat', NULL, 8, 7, 'egg-roll-cheese-avocat.jpg'),
(6, 'MC19', 'Egg roll thon cuit avocat', NULL, 8, 7, NULL),
(6, 'MC20', 'Egg roll saumon grillé à la sauce sucré', NULL, 8, 7, NULL),

(7, 'MC21', 'Saumon roll saumon', NULL, 8, 7, NULL),
(7, 'MC22', 'Saumon roll fromage', NULL, 8, 7, 'saumon-roll-cheese.jpg'),
(7, 'MC23', 'Saumon roll fromage avocat', NULL, 8, 7.5, 'saumon-roll-avocat-cheese.jpg'),
(7, 'MC24', 'Saumon roll fromage concombre', NULL, 8, 7.5, NULL),
(7, 'MC25', 'Saumon roll thon cuit', NULL, 8, 7, NULL),

(8, 'MC26', 'Maki printemps fromage concombre', NULL, 8, 6.5, NULL),
(8, 'MC27', 'Maki printemps fromage saumon', NULL, 8, 6.5, 'spring-roll-saumon-cheese.jpg'),
(8, 'MC28', 'Maki printemps thon rouge avocat', NULL, 8, 7, 'spring-roll-thon-avocat.jpg'),
(8, 'MC29', 'Maki printemps crevettes avocat', NULL, 8, 7, NULL),
(8, 'MC30', 'Maki printemps thon cuit', NULL, 8, 7, 'spring-roll-thon-cuit-avocat.jpg'),
(8, 'MC31', 'Maki printemps tempura crevettes à la sauce épicée', NULL, 8, 7, NULL),

(9, 'MC32', 'Maki neige saumon', NULL, 8, 6, NULL),
(9, 'MC33', 'Maki neige thon', NULL, 8, 6, NULL),
(9, 'MC34', 'Maki neige thon cuit', NULL, 8, 6, NULL),
(9, 'MC35', 'Maki neige tempura crevettes', NULL, 8, 6.5, NULL),
(9, 'MC36', 'Maki neige fromage', NULL, 8, 6, NULL),

(10, 'SU1', 'Sushi saumon', NULL, 2, 4.5, 'sushi-saumon.jpg'),
(10, 'SU2', 'Sushi thon', NULL, 2, 4.5, 'sushi-thon.jpg'),
(10, 'SU3', 'Sushi daurade', NULL, 2, 4.5, 'sushi-daurade.jpg'),
(10, 'SU4', 'Sushi avocat', NULL, 2, 4.5, 'sushi-avocat.jpg'),
(10, 'SU5', 'Sushi maquereau', NULL, 2, 4.5, NULL),
(10, 'SU6', 'Sushi crevette', NULL, 2, 5, 'sushi-crevette.jpg'),
(10, 'SU7', 'Sushi poulpe', NULL, 2, 5.5, 'sushi-poulpe.jpg'),
(10, 'SU8', 'Sushi saumon fromage', NULL, 2, 4.8, NULL),
(10, 'SU9', 'Sushi camembert', NULL, 2, 4.5, NULL),
(10, 'SU10', 'Sushi anguille grillée', NULL, 2, 5.5, NULL),
(10, 'SU11', 'Sushi saumon avocat', NULL, 2, 5, 'sushi-saumon-avocat.jpg'),

(11, 'SA1', 'Sashimi saumon', NULL, 10, 8, 'sashimi-saumon.jpg'),
(11, 'SA2', 'Sashimi thon', NULL, 10, 8.5, 'sashimi-thon.jpg'),
(11, 'SA3', 'Sashimi daurade', NULL, 10, 8, 'sashimi-daurade.jpg'),
(11, 'SA4', 'Sashimi maquereau', NULL, 10, 7, NULL),
(11, 'SA5', 'Sashimi poulpe', NULL, 10, 11, 'sashimi-poulpe.jpg'),
(11, 'SA6', 'Sashimi anguille grillée', NULL, 10, 11, NULL),
(11, 'SA7', 'Assortiment de sashimi', NULL, 12, 11, 'sashimi-assortiments.jpg'),

(12, 'Y1', 'Brochette poulet', NULL, 2, 4, 'brochette-poulet.jpg'),
(12, 'Y2', 'Brochette boulettes de poulet', NULL, 2, 4, 'brochette-boulettes-poulet.jpg'),
(12, 'Y3', 'Brochette aile de poulet', NULL, 2, 5, 'brochette-aile-de-poulet.jpg'),
(12, 'Y4', 'Brochette boeuf', NULL, 2, 4.8, 'brochette-boeuf.jpg'),
(12, 'Y5', 'Brochette boeuf au fromage', NULL, 2, 4.5, 'brochette-boeuf-fromage.jpg'),
(12, 'Y6', 'Brochette maquereau', NULL, 2, 5.3, NULL),
(12, 'Y7', 'Brochette gambas', NULL, 2, 6, 'brochette-gambas.jpg'),
(12, 'Y9', 'Brochette saumon', NULL, 2, 5.5, 'brochette-saumon.jpg'),
(12, 'Y10', 'Brochette thon', NULL, 2, 5.5, 'brochette-thon.jpg'),
(12, 'Y11', 'Brochette champignons', NULL, 2, 4, 'brochette-champignons.jpg'),
(12, 'Y12', 'Brochette canard', NULL, 2, 5.5, NULL),

(13, NULL, 'Ice tea', '33cl', 1, 1.5, NULL),
(13, NULL, 'Fanta', '33cl', 1, 1.5, NULL),
(13, NULL, 'Coca cola', '33cl', 1, 1.5, NULL),
(13, NULL, 'Coca cola cherry', '33cl', 1, 2, NULL),
(13, NULL, 'Jus de fruits', 'au choix: lychee, ananas, 25cl', 1, 2.8, NULL),
(13, NULL, 'Kirin', 'sans alcool', 1, 3.9, NULL),

(14, NULL, 'Asahi', '33cl', 1, 4, NULL),
(14, NULL, 'Kirin', '33cl', 1, 4, NULL),

(15, NULL, 'Côtes de provences', 'rosé, 37.5cl', 1, 7, NULL),
(15, NULL, 'Muscadet', 'blanc, 37.5cl', 1, 8, NULL),
(15, NULL, 'Côtes du Rhône', 'rouge, 37.5cl', 1, 8, NULL),

(16, 'P1', 'Ramen', 'nouilles japonaises au boeuf, algue et légumes', 1, 9, NULL),
(16, 'P2', 'Bobun', 'vermicelle de riz, boeuf, nems, salade variée', 1, 9, 'bobun.jpeg'),
(16, 'P3', 'Soupe de raviolis japonais', '8 pièces', 1, 9, NULL),
(16, 'P4', 'Nouilles sautées au boeuf', NULL, 1, 8, NULL),
(16, 'P5', 'Nouilles sautées au crevettes', NULL, 1, 9, NULL),
(16, 'P6', 'Boeuf sauté aux oignons', NULL, 1, 8, 'saute-boeuf.jpeg'),
(16, 'P7', 'Crevettes à la sauce piquante', NULL, 1, 10.5, NULL),
(16, 'P8', 'Vermicelles sautés au boeuf', NULL, 1, 8, NULL),
(16, 'P9', 'Udon sauté aux légumes', NULL, 1, 8, NULL),
(16, 'P10', 'Dame de saumon avec du riz', NULL, 1, 12, NULL),
(16, 'P11', 'Nouilles sautées au fromage', NULL, 1, 8, NULL),

(17, 'E15', 'Edamame', 'fève d''haricot', 1, 4.5, 'edamame.jpg'),
(17, 'E16', 'Salade d''algue piquante', NULL, 1, 4.5, 'salade-dalgue.jpg'),
(17, 'E17', 'Salade de saumon', NULL, 1, 7, NULL),
(17, 'E18', 'Salade de crevettes', NULL, 1, 8, NULL),
(17, 'E19', 'Salade de camembert', NULL, 1, 6, NULL),
(17, 'E20', 'Capaccio de saumon', '10 pièces', 1, 9.5, NULL),

(3, NULL, 'California thon avocat', NULL, 8, 5.5, 'california-thon-avocat.jpg'),
(8, NULL, 'Maki printemps saumon', NULL, 8, 6.5, NULL),
(8, NULL, 'Maki printemps thon', NULL, 8, 6.5, NULL),
(8, NULL, 'Maki printemps fromage', NULL, 8, 6.5, NULL),
(3, NULL, 'California futomaki', NULL, 8, 7.5, NULL),
(6, NULL, 'Egg roll fromage', NULL, 8, 7, NULL),
(9, NULL, 'Maki neige avocat', NULL, 8, 6, NULL),
(3, NULL, 'California thon cuit', NULL, 8, 5.5, NULL),
(8, NULL, 'Maki printemps avocat fromage', NULL, 8, 6.5, NULL),
(1, NULL, 'Beignet de crevettes', NULL, 1, 6.5, NULL);

-- Insert data into menu
INSERT INTO menu (category_id, code, name, description, price, image) VALUES
( 1, 'E1', 'Riz nature', NULL, 2, 'riz-nature.jpg'),
( 1, 'E2', 'Salade de choux', NULL, 3, 'salade-de-choux.jpg'),
( 1, 'E3', 'Soupe miso', NULL, 2.5, 'soupe-miso.jpg'),
( 1, 'E4', 'Riz cantonais', NULL, 5.5, NULL),
( 1, 'E5', 'Riz vinaigré', NULL, 3, 'riz-vinaigre.jpg'),
( 1, 'E6', 'Riz sauté au curry et aux crevettes', NULL, 6.5, NULL),
( 1, 'E7', 'Gyoza', 'raviolis grillés', 6, 'gyoza.jpg'),
( 1, 'E8', 'Raviolis aux crevettes vapeur', NULL, 6, NULL),
( 1, 'E9', 'Nems au poulet', NULL, 6.5, 'nems-poulet.jpg'),
(1, 'E10', 'Tempura crevettes', NULL, 10, 'tempura-crevette.jpg'),
(1, 'E11', 'Shaké tempura', 'beignet saumon', 10, NULL),
(1, 'E12', 'Beignet poulet', NULL, 6.5, NULL),
(1, 'E13', 'Beignet fromage', NULL, 6.5, NULL),
(1, 'E14', 'Samoussa', NULL, 5.5, NULL),

(1, 'MA1', 'Maki saumon', NULL, 5, 'maki-saumon.jpg'),
(1, 'MA2', 'Maki thon', NULL, 5.5, 'maki-thon.jpg'),
(1, 'MA3', 'Maki anguille', NULL, 6, NULL),
(1, 'MA4', 'Maki concombre', NULL, 4.5, 'maki-concombre.jpg'),
(1, 'MA6', 'Maki avocat', NULL, 4.5, 'maki-avocat.jpg'),
(1, 'MA7', 'Maki boeuf au fromage', NULL, 6, NULL),
(1, 'MA8', 'Maki avocat fromage', NULL, 6, NULL),
(1, 'MA9', 'Maki radis', NULL, 4.5, NULL),
(1, 'MA10', 'Maki saumon fromage', NULL, 6, NULL),
(1, 'MA11', 'Maki thon épicé', NULL, 5.5, NULL),
(1, 'MA12', 'Futomaki', 'saumon, thon, avocat, surimi concombre, cheese', 7.5, NULL),
(1, 'MA13', 'Futomaki végétarien', NULL, 6.5, NULL),
(1, 'MA14', 'Temaki cornet au choix', 'thon, saumon, surimi, crevette, boeuf au fromage', 6.5, NULL),

(1, 'MC1', 'California crevettes avocat mayonnaise', NULL, 5.5, NULL),
(1, 'MC2', 'California saumon avocat', NULL, 5.5, NULL),
(1, 'MC3', 'California surimi avocat', NULL, 5.5, NULL),
(1, 'MC4', 'California thon cuit avocat mayonnaise', NULL, 5.5, NULL),
(1, 'MC5', 'California Nigiri Las vegas', NULL, 6.2, NULL),
(1, 'MC6', 'California croustillant poulet beignet', NULL, 6, NULL),
(1, 'MC7', 'California tempura crevettes', NULL, 7, NULL),
(1, 'MC9', 'California coriandre thon cuit', NULL, 6.5, NULL),
(1, 'MC10', 'California Las vegas à la sauce épicée', NULL, 6.5, NULL),

(1, 'MC11', 'Dragon roll saumon avocat', NULL, 8.5, NULL),
(1, 'MC12', 'Dragon roll tempura crevettes à la sauce épicée', NULL, 9, NULL),
(1, 'MC13', 'Dragon roll thon cuit avocat fromage', NULL, 8.5, NULL),

(1, 'MC14', 'Croustillant saumon grillé', NULL, 7, NULL),
(1, 'MC15', 'Croustillant tempura crevettes à la sauce épicée', NULL, 7.5, NULL),
(1, 'MC16', 'Croustillant poulet épicée', NULL, 7, NULL),

(1, 'MC18', 'Egg roll cheese avocat', NULL, 7, NULL),
(1, 'MC19', 'Egg roll thon cuit avocat', NULL, 7, NULL),
(1, 'MC20', 'Egg roll saumon grillé à la sauce sucré', NULL, 7, NULL),

(1, 'MC21', 'Saumon roll saumon', NULL, 7, NULL),
(1, 'MC22', 'Saumon roll fromage', NULL, 7, NULL),
(1, 'MC23', 'Saumon roll fromage avocat', NULL, 7.5, NULL),
(1, 'MC24', 'Saumon roll fromage concombre', NULL, 7.5, NULL),
(1, 'MC25', 'Saumon roll thon cuit', NULL, 7, NULL),

(1, 'MC26', 'Maki printemps fromage concombre', NULL, 6.5, NULL),
(1, 'MC27', 'Maki printemps fromage saumon', NULL, 6.5, NULL),
(1, 'MC28', 'Maki printemps thon rouge avocat', NULL, 7, NULL),
(1, 'MC29', 'Maki printemps crevettes', NULL, 7, NULL),
(1, 'MC30', 'Maki printemps thon cuit', NULL, 7, NULL),
(1, 'MC31', 'Maki printemps tempura crevettes à la sauce épicée', NULL, 7, NULL),

(1, 'MC32', 'Maki neige saumon', NULL, 6, NULL),
(1, 'MC33', 'Maki neige thon', NULL, 6, NULL),
(1, 'MC34', 'Maki neige thon cuit', NULL, 6, NULL),
(1, 'MC35', 'Maki neige tempura crevettes', NULL, 6.5, NULL),
(1, 'MC36', 'Maki neige fromage', NULL, 6, NULL),

(1, 'SU1', 'Sushi saumon', NULL, 4.5, NULL),
(1, 'SU2', 'Sushi thon', NULL, 4.5, NULL),
(1, 'SU3', 'Sushi daurade', NULL, 4.5, NULL),
(1, 'SU4', 'Sushi avocat', NULL, 4.5, NULL),
(1, 'SU5', 'Sushi maquereau', NULL, 4.5, NULL),
(1, 'SU6', 'Sushi crevettes', NULL, 5, NULL),
(1, 'SU7', 'Sushi poulpe', NULL, 5.5, NULL),
(1, 'SU8', 'Sushi saumon fromage', NULL, 4.8, NULL),
(1, 'SU9', 'Sushi camembert', NULL, 4.5, NULL),
(1, 'SU10', 'Sushi anguille grillée', NULL, 5.5, NULL),
(1, 'SU11', 'Sushi saumon avocat', NULL, 5, NULL),

(1, 'SA1', 'Sashimi saumon', NULL, 8, NULL),
(1, 'SA2', 'Sashimi thon', NULL, 8.5, NULL),
(1, 'SA3', 'Sashimi daurade', NULL, 8, NULL),
(1, 'SA4', 'Sashimi maquereau', NULL, 7, NULL),
(1, 'SA5', 'Sashimi poulpe', NULL, 11, NULL),
(1, 'SA6', 'Sashimi anguille grillée', NULL, 11, NULL),
(1, 'SA7', 'Assortillement de sashimi', NULL, 11, NULL),

(1, 'Y1', 'Brochette poulet', NULL, 4, NULL),
(1, 'Y2', 'Brochette boulettes de poulet', NULL, 4, NULL),
(1, 'Y3', 'Brochette aile de poulet', NULL, 5, NULL),
(1, 'Y4', 'Brochette boeuf', NULL, 4.8, NULL),
(1, 'Y5', 'Brochette boeuf au fromage', NULL, 4.5, NULL),
(1, 'Y6', 'Brochette maquereau', NULL, 5.3, NULL),
(1, 'Y7', 'Brochette gambas', NULL, 6, NULL),
(1, 'Y9', 'Brochette saumon', NULL, 5.5, NULL),
(1, 'Y10', 'Brochette thon', NULL, 5.5, NULL),
(1, 'Y11', 'Brochette champignons', NULL, 4, NULL),
(1, 'Y12', 'Brochette canard', NULL, 5.5, NULL),

(1, NULL, 'Ice tea', '33cl', 1.5, NULL),
(1, NULL, 'Fanta', '33cl', 1.5, NULL),
(1, NULL, 'Coca cola', '33cl', 1.5, NULL),
(1, NULL, 'Coca cola cherry', '33cl', 2, NULL),
(1, NULL, 'Jus de fruits', 'au choix: lychee, ananas, 25cl', 2.8, NULL),
(1, NULL, 'Kirin', 'sans alcool', 3.9, NULL),

(1, NULL, 'Asahi', '33cl', 4, NULL),
(1, NULL, 'Kirin', '33cl', 4, NULL),

(1, NULL, 'Côtes de provences', 'rosé, 37.5cl', 7, NULL),
(1, NULL, 'Muscadet', 'blanc, 37.5cl', 8, NULL),
(1, NULL, 'Côtes du Rhône', 'rouge, 37.5cl', 8, NULL),

(1, 'P1', 'Ramen', 'nouilles japonaises au boeuf, algue et légumes', 9, NULL),
(1, 'P2', 'Bobun', 'vermicelle de riz, boeuf, nems, salade variée', 9, NULL),
(1, 'P3', 'Soupe de raviolis japonais', '8 pièces', 9, NULL),
(1, 'P4', 'Nouilles sautées au boeuf', NULL, 8, NULL),
(1, 'P5', 'Nouilles sautées au crevettes', NULL, 9, NULL),
(1, 'P6', 'Boeuf sauté aux oignons', NULL, 8, NULL),
(1, 'P7', 'Crevettes à la sauce piquante', NULL, 10.5, NULL),
(1, 'P8', 'Vermicelles sautés au boeuf', NULL, 8, NULL),
(1, 'P9', 'Udon sauté aux légumes', NULL, 8, NULL),
(1, 'P10', 'Dame de saumon avec du riz', NULL, 12, NULL),
(1, 'P11', 'Nouilles sautées au fromage', NULL, 8, NULL),

(1, 'E15', 'Edamame', 'fève d''haricot', 4.5, NULL),
(1, 'E16', 'Salade d''algue piquante', NULL, 4.5, NULL),
(1, 'E17', 'Salade de saumon', NULL, 7, NULL),
(1, 'E18', 'Salade de crevettes', NULL, 8, NULL),
(1, 'E19', 'Salade de camembert', NULL, 6, NULL),
(1, 'E20', 'Capaccio de saumon', '10 pièces', 9.5, NULL),

(2, 'A1', 'Menu A1', NULL, 13, NULL),
(2, 'A2', 'Menu A2', NULL, 14, NULL),
(2, 'A3', 'Menu A3', NULL, 15, NULL),
(2, 'A4', 'Menu A4', NULL, 16, NULL),
(2, 'A5', 'Menu A5', NULL, 17, NULL),
(2, 'A6', 'Menu A6', NULL, 18, NULL),
(2, 'A7', 'Menu A7', NULL, 19, NULL),
(2, 'A8', 'Menu A8', NULL, 20, NULL),
(2, 'A9', 'Menu A9', NULL, 21, NULL),
(2, 'A10', 'Menu A10', NULL, 22, NULL),
(2, 'A11', 'Menu A11', NULL, 23, NULL),
(2, 'A12', 'Menu A12', NULL, 24, NULL),

(3, 'S1', 'Menu S1', 'saumon cru sur un bol de riz vinaigré + avocat', 13, NULL),
(3, 'S2', 'Menu S2', 'anguille grillée sur un bol de riz vinaigré', 16, NULL),
(3, 'S3', 'Menu S3', 'poisson mixte ou thon ou saumon et thon sur un bol de riz vinaigré', 15, NULL),
(3, NULL, 'Omelette', 'chirashi omelette ou beignets poulets', 12, NULL),

(4, 'PK1', 'Poké au poulet', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, oignons frits, poulet frits', 14.9, 'poke-bowl-poulet.jpg'),
(4, 'PK2', 'Poké au boeuf', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, oignons frits, boeuf sauté', 14.9, 'poke-bowl-boeuf.jpg'),
(4, 'PK3', 'Poké au saumon', 'Garnitures : Riz vinaigré, carotte rapée, avocat, algue marinée, omelette, saumon cru', 14.9, 'poke-bowl-saumon.jpg'),
(4, 'PK4', 'Poké végétarien', 'Garnitures : Riz vinaigré, carotte rapée, concombre, edamame, radis jaune mariné, avocat, algue marinée', 13.5, 'poke-bowl-vegetarien.jpg'),

(5, '1', 'Menu 1', NULL, 8, NULL),
(5, '2', 'Menu 2', NULL, 9, NULL),
(5, '3', 'Menu 3', NULL, 9, NULL),
(5, '4', 'Menu 4', NULL, 9.5, NULL),
(5, '5', 'Menu 5', NULL, 13, NULL),
(5, '6', 'Menu 6', NULL, 13, NULL),
(5, '7', 'Menu 7', NULL, 11, NULL),
(5, '8', 'Menu 8', NULL, 11, NULL),

(6, '9', 'Menu 9', NULL, 15, NULL),
(6, '10', 'Menu 10', NULL, 15.5, NULL),
(6, '11', 'Menu 11', NULL, 10.5, NULL),
(6, '12', 'Menu 12', NULL, 16.9, NULL),
(6, 'V', 'Menu végétarien', NULL, 14, NULL),

(7, 'S4', 'Menu S4', NULL, 16, NULL),
(7, 'S5', 'Menu S5', NULL, 21, NULL),
(7, 'S6', 'Menu S6', NULL, 17, NULL),
(7, 'S7', 'Menu S7', NULL, 14, NULL),
(7, 'S8', 'Menu S8', NULL, 14.5, NULL),
(7, 'S9', 'Menu S9', NULL, 15, NULL),
(7, 'S10', 'Menu S10', NULL, 17.5, NULL),
(7, 'S11', 'Menu S11', '4 saumons et 4 thons / 8 saumons', 13.5, NULL),
(7, 'S12', 'Menu S12', NULL, 16, NULL),
(7, 'S13', 'Menu S13', NULL, 18, NULL),
(7, 'S14', 'Menu S14', NULL, 15, NULL),
(7, 'S15', 'Menu S15', NULL, 16.5, NULL),
(7, 'S16', 'Menu S16', NULL, 18, NULL),
(7, 'S17', 'Menu S17', NULL, 16.5, NULL),
(7, 'S18', 'Menu S18', NULL, 19, NULL),
(7, 'S19', 'Menu S19', NULL, 15, NULL),

(8, 'BT1', 'Menu BT1', NULL, 18, NULL),
(8, 'BT2', 'Menu BT2', NULL, 19, NULL),
(8, 'BT3', 'Menu BT3', NULL, 20, NULL),

(9, 'F1', 'Menu F1', 'Boissons au choix: jus de lychee, coca cola ; Dessert au choix : lychees, nougat ou une boule de glace', 8.9, NULL),
(9, 'F2', 'Menu F1', 'Boissons au choix: jus de lychee, coca cola ; Dessert au choix : lychees, nougat ou une boule de glace', 8.9, NULL),

(10, NULL, 'Menu valentin', 'pour 2 pers.', 39.90, NULL),
(10, NULL, 'Menu yamayoshi', 'pour 2-3 pers.', 55, NULL),
(10, NULL, 'Menu royal', 'pour 4-5 pers.', 72, NULL),
(10, NULL, 'Menu royal+', 'pour 4-5 pers.', 82, NULL);


-- Insert data into menu_food
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
