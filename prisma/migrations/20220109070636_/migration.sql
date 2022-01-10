/*
  Warnings:

  - You are about to drop the column `key` on the `Service` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "is_registred" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("id", "is_registred", "name", "update_at", "userId") SELECT "id", "is_registred", "name", "update_at", "userId" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
