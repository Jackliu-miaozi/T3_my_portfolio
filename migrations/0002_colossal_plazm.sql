CREATE TABLE `my_portfolio_2_images` (
	`id` text PRIMARY KEY DEFAULT (uuid()) NOT NULL,
	`file_name` text NOT NULL,
	`file_type` text NOT NULL,
	`data` text(2147483647) NOT NULL,
	`uploaded_by` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`uploaded_by`) REFERENCES `my_portfolio_2_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `images_uploaded_by_idx` ON `my_portfolio_2_images` (`uploaded_by`);