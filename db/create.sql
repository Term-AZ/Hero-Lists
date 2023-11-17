use superheros;

CREATE TABLE superheros(
	id INT auto_increment NOT NULL,
    hero_name varchar(64) NOT NULL,
    gender ENUM('male','female','-') NOT NULL,
    eye_color varchar(64),
    hair_color varchar(64),
    height float(64,2),
    publisher varchar(64),
    skin_color varchar(64),
    alignment ENUM('good','bad','neutral', '-') NOT NULL,
    hero_weight INT,
    PRIMARY KEY (id)
);

CREATE TABLE abilities(
	id INT auto_increment NOT NULL,
    ability_name varchar(64),
    PRIMARY KEY (id)
);

CREATE TABLE hero_abilities(
    hero_id INT NOT NULL,
    ability_id INT NOT NULL,
    PRIMARY KEY (hero_id, ability_id),
    FOREIGN KEY (hero_id) references superheros(id) ON DELETE CASCADE,
    FOREIGN KEY (ability_id) references abilities(id) ON DELETE CASCADE
);

