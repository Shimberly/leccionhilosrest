/* create database LOVEFOOD */
CREATE TABLE usuario(
	id serial NOT NULL,
	nombre varchar(255),
  apellido varchar(255),
  correo varchar(255),
  clave varchar(255),
  sexo varchar(255),
  fecha_nacimiento varchar(255),
   	PRIMARY KEY (id)
);
/*
CREATE TABLE informacion(
  id serial NOT NULL,
  idusuario integer,
  universidad varchar(255),
  ciudad varchar(255),
  pais varchar(255),
  carrera varchar(255),
  descripcion varchar(255),
  numero varchar(255),
  instagram varchar(255),
  preferencia varchar(255),
  PRIMARY KEY (id),
  CONSTRAINT  idusuario 
      FOREIGN KEY ( idusuario )
      REFERENCES   usuario  ( id )
);
*/
INSERT INTO usuario ( nombre,apellido,numero,correo,clave,sexo,fecha_nacimiento) VALUES
('Webbi','SA','0985992827','webbisolutions@gmail.com','teamwebbi','mujer','04-05-2018');
/*
INSERT INTO informacion (idusuario,universidad,ciudad,pais,carrera) VALUES
(2,'ESPOL','Guayaquil','Ecuador','Diseño web y aplicaciones multimedia');
*/