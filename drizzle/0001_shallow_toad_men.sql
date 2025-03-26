ALTER TABLE `my_portfolio_2_user` ADD `passwordHash` text(255);--> statement-breakpoint
ALTER TABLE `my_portfolio_2_user` ADD `createdAt` integer DEFAULT (unixepoch());--> statement-breakpoint
ALTER TABLE `my_portfolio_2_user` ADD `updatedAt` integer;