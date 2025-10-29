CREATE SEQUENCE food_item_id_seq;

ALTER TABLE food_item
ALTER COLUMN id SET DEFAULT nextval('food_item_id_seq');

SELECT setval('food_item_id_seq', COALESCE((SELECT MAX(id) FROM food_item), 1));
