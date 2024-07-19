-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/1nrD44
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "data" (
    "indicator_id" VARCHAR(255)   NOT NULL,
    "region_id" VARCHAR(255)   NOT NULL,
    "date" DATE   NOT NULL,
    "value" INT   NOT NULL,
    "zip" VARCHAR(255)   NOT NULL
);

CREATE TABLE "indicators" (
    "indicator_id" VARCHAR(255)   NOT NULL,
    "indicator" VARCHAR(255)   NOT NULL,
    "category" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_indicators" PRIMARY KEY (
        "indicator_id"
     )
);

CREATE TABLE "regions" (
    "region_id" INT   NOT NULL,
    "region_type" VARCHAR(255)   NOT NULL,
    "region" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_regions" PRIMARY KEY (
        "region_id"
     )
);

ALTER TABLE "data" ADD CONSTRAINT "fk_data__indicator_id" FOREIGN KEY("indicator_id")
REFERENCES "indicators" ("indicator_id");

ALTER TABLE "data" ADD CONSTRAINT "fk_data__region_id" FOREIGN KEY("region_id")
REFERENCES "regions" ("region_id");