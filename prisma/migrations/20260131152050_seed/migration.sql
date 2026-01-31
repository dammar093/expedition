/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
