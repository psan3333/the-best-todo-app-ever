PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text,
	`title` text NOT NULL,
	`description` text DEFAULT '',
	`metricOfCompletion` text DEFAULT '',
	`changedAt` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_todo`("id", "type", "title", "description", "metricOfCompletion", "changedAt") SELECT "id", "type", "title", "description", "metricOfCompletion", "changedAt" FROM `user_todo`;--> statement-breakpoint
DROP TABLE `user_todo`;--> statement-breakpoint
ALTER TABLE `__new_user_todo` RENAME TO `user_todo`;--> statement-breakpoint
PRAGMA foreign_keys=ON;