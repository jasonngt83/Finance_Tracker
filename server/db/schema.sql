-- DROP DATABASE
DROP DATABASE IF EXISTS budgetbuddy_db;

-- CREATE DATABASE

CREATE DATABASE budgetbuddy_db;
\c budgetbuddy_db;
CREATE TABLE "user" (
  id INTEGER NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);
