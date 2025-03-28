ALTER TABLE `my_portfolio_2_post` ADD `content` text(256);--> statement-breakpoint
ALTER TABLE `my_portfolio_2_user` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `my_portfolio_2_user` DROP COLUMN `updatedAt`;