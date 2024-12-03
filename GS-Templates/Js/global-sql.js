//Global SQL help FOR EASY use 

# Create Database Example

DROP DATABASE IF EXISTS favsongs;
CREATE DATABASE favsongs;


CREATE TABLE artists(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  alive BOOLEAN
);

CREATE INDEX ON artists (name);

# CREATE Table Example

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  song TEXT NOT NULL,
  album TEXT NOT NULL,
  time TIME,
  rating INTEGER,
  artist_id INTEGER REFERENCES artists
);

CREATE INDEX ON songs (song);
CREATE INDEX ON songs (album);
CREATE INDEX ON songs (time);
CREATE INDEX ON songs (rating);

# Select Data Example

SELECT a.name, s.song, s.album, s.time 
  FROM artists a, songs s
  WHERE S.artist_id = a.id;
  

# Insert Data Example

INSERT INTO artists (name,alive)
  VALUES 
  ('Adelle',true),
  ('Al Green',true),
  ('The Album Leaf',true),
  ('Alicia Keys',true),
  ('Amy Winehouse',false),
  ('The Animals',false),
  ('Anthony Hamilton',true),
  ('Aphex Twin',true),
  ('Arcade Fire',true),
  ('Aretha Franklin',true),
  ('Arturo Sandoval',true),
  ('Atoms for Peace',true),
  ('Audioslave',true),
  ('Barenaked Ladies',true),
  ('Beastie Boys',true),
  ('The Beatles',true),
  ('Ben Folds Five',true),
  ('Billie Holiday',false),
  ('The Black Keys',true),
  ('Black Sabbath',true),
  ('Bob Dylan',true),
  ('Bob Marley',false),
  ('Bon Iver',true),
  ('Cee Lo Green',true),
  ('Coldplay',true),
  ('Cream',true),
  ('Crystal Method',true),
  ('Daft Punk',true),
  ('David Bowie',true),
  ('The Doors',false),
  ('El Ten Eleven',true),
  ('Florence + The Machine',true),
  ('Franz Ferdinand',true),
  ('Gary Clark Jr.',true),
  ('Gorillaz',true),
  ('Grouplove',true),
  ('Imagine Dragons',true),
  ('Jack White',true),
  ('Jay Z',true),
  ('Jimmy Cliff',true),
  ('John Coltrane',false),
  ('John Lee Hooker',false),
  ('John Lennon',false),
  ('Johnny Cash',false),
  ('Justin Timberlake',true),
  ('Kanye West',true),
  ('Kings Of Leon',true),
  ('The Killers',true),
  ('Led Zeppelin',true),
  ('Maroon 5',true),
  ('MGMT',true),
  ('Miles Davis',false),
  ('Moby',true),
  ('Mos Def',true),
  ('Nirvana',true),
  ('Pato Banton',true),
  ('Pearl Jam',true),
  ('Peter Tosh',false),
  ('The Police',true),
  ('The Postal Service',true),
  ('Radiohead',true),
  ('Raphael Saadiq',true),
  ('Red Hot Chili Peppers',true),
  ('The Rolling Stones',true),
  ('The Roots',true),
  ('The Shins',true),
  ('The Smiths',true),
  ('Talib Kweli',true),
  ('Thom Yorke',true),
  ('Van Morrison',true),
  ('Wu Tang Clan',true);  