-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Widget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "params" TEXT NOT NULL,
    "userId" INTEGER,
    "serviceId" INTEGER,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "Widget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Widget_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Widget" ("id", "name", "params", "serviceId", "update_at", "userId") SELECT "id", "name", "params", "serviceId", "update_at", "userId" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
