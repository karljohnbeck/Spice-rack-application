
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "spices" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"img_url" varchar(255) NOT NULL,
	"exp_date" DATE NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "spices_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "spices_categories" (
	"id" serial NOT NULL,
	"categories_id" int NOT NULL,
	"spices_id" int NOT NULL,
	CONSTRAINT "spices_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "categories" ADD CONSTRAINT "categories_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "spices" ADD CONSTRAINT "spices_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "spices_categories" ADD CONSTRAINT "spices_categories_fk0" FOREIGN KEY ("categories_id") REFERENCES "categories"("id");
ALTER TABLE "spices_categories" ADD CONSTRAINT "spices_categories_fk1" FOREIGN KEY ("spices_id") REFERENCES "spices"("id");