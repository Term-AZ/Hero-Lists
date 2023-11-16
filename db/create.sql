use superheros;

CREATE TABLE superheros(
	id INT auto_increment NOT NULL,
    hero_name varchar(64) NOT NULL,
    gender ENUM('male','female','-') NOT NULL,
    eye_color varchar(16),
    hair_color varchar(16),
    height float(4,2),
    publisher varchar(32),
    skin_color varchar(32),
    alignment ENUM('good','bad','-'),
    hero_weight INT,
    PRIMARY KEY (id)
)

CREATE TABLE abilities(
	id INT auto_increment NOT NULL,
    ability_name varchar(64),
    PRIMARY KEY (id)
)

CREATE TABLE hero_abilities(
    hero_id INT NOT NULL,
    ability_id INT NOT NULL,
    PRIMARY KEY (hero_id, ability_id),
    FOREIGN KEY (hero_id) references superheros(id) ON DELETE CASCADE,
    FOREIGN KEY (ability_id) references abilities(id) ON DELETE CASCADE
)