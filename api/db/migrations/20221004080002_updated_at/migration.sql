/*
  Warnings:

  - You are about to drop the column `userId` on the `UserCredential` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserCredential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicKey" BLOB NOT NULL,
    "transports" TEXT,
    "counter" BIGINT NOT NULL
);
INSERT INTO "new_UserCredential" ("counter", "id", "publicKey", "transports") SELECT "counter", "id", "publicKey", "transports" FROM "UserCredential";
DROP TABLE "UserCredential";
ALTER TABLE "new_UserCredential" RENAME TO "UserCredential";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "roles" TEXT NOT NULL DEFAULT 'user',
    "webAuthnChallenge" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("email", "hashedPassword", "id", "name", "resetToken", "resetTokenExpiresAt", "roles", "salt", "webAuthnChallenge") SELECT "email", "hashedPassword", "id", "name", "resetToken", "resetTokenExpiresAt", "roles", "salt", "webAuthnChallenge" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_webAuthnChallenge_key" ON "User"("webAuthnChallenge");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
