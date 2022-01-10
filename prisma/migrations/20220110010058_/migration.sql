-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expires" INTEGER NOT NULL,
    "widgetId" INTEGER,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "Token_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_widgetId_key" ON "Token"("widgetId");
