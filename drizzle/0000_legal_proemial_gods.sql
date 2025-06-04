CREATE TABLE "tic_tac_toe_games" (
	"id" varchar(225) PRIMARY KEY NOT NULL,
	"currentPlayer" varchar(225) PRIMARY KEY NOT NULL,
	"board" jsonb NOT NULL,
	"result" varchar(255)
);
