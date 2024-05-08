-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_img" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" REAL NOT NULL,
    "item_stock" INTEGER NOT NULL,
    "quantitySelected" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "sellerId" INTEGER,
    "buyerId" INTEGER,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Item_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("buyerId", "item_id", "item_img", "item_name", "item_price", "item_stock", "quantitySelected", "sellerId", "seller_id") SELECT "buyerId", "item_id", "item_img", "item_name", "item_price", "item_stock", "quantitySelected", "sellerId", "seller_id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
