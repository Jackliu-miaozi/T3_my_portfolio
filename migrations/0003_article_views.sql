-- 创建文章阅读量表
CREATE TABLE `my_portfolio_2_article_views` (
  `id` text PRIMARY KEY NOT NULL,
  `article_id` integer NOT NULL,
  `ip_address` text NOT NULL,
  `created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX `article_view_ip_idx` ON `my_portfolio_2_article_views` (`article_id`, `ip_address`);
CREATE INDEX `article_view_id_idx` ON `my_portfolio_2_article_views` (`article_id`);