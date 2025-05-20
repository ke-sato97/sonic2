-- CreateTable
CREATE TABLE `files` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `comment_count` INTEGER NOT NULL,
    `like_count` INTEGER NOT NULL,
    `filename_small` VARCHAR(191) NOT NULL,
    `filesize` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `video_duration` INTEGER NOT NULL,
    `video_url` VARCHAR(191) NOT NULL,
    `ref` VARCHAR(191) NOT NULL,
    `thumbnail_ref` VARCHAR(191) NOT NULL,
    `thumbnail_url` VARCHAR(191) NOT NULL,
    `thumbnail_murl` VARCHAR(191) NOT NULL,
    `thumbnail_surl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `file_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,

    INDEX `comments_file_id_idx`(`file_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
