CREATE TABLE `my_portfolio_2_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `my_portfolio_2_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `my_portfolio_2_account` (`userId`);--> statement-breakpoint
CREATE TABLE `my_portfolio_2_myartical` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text(256),
	`title` text(256),
	`summary` text(256),
	`category` text(256),
	`image` text(256),
	`name` text(256),
	`createdBy` text(256),
	`createdAt` integer DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `myartical_id_idx` ON `my_portfolio_2_myartical` (`id`);--> statement-breakpoint
CREATE TABLE `my_portfolio_2_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`context` text(256),
	`image` text(256),
	`name` text(256),
	`createdBy` text(256),
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `id_idx` ON `my_portfolio_2_post` (`id`);--> statement-breakpoint
CREATE TABLE `my_portfolio_2_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `my_portfolio_2_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `my_portfolio_2_session` (`userId`);--> statement-breakpoint
CREATE TABLE `my_portfolio_2_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer DEFAULT (unixepoch()),
	`image` text(255),
	`passwordHash` text(255)
);
--> statement-breakpoint
CREATE TABLE `my_portfolio_2_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
