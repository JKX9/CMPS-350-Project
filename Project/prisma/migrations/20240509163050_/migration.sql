-- CreateTable
CREATE TABLE "Transactions" (
    "transaction_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_img" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" REAL NOT NULL,
    "item_stock" INTEGER NOT NULL,
    "quantitySelected" INTEGER,
    "seller_id" INTEGER NOT NULL,
    "buyer_id" INTEGER,
    CONSTRAINT "Item_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "Buyer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("buyer_id", "item_id", "item_img", "item_name", "item_price", "item_stock", "quantitySelected", "seller_id") SELECT "buyer_id", "item_id", "item_img", "item_name", "item_price", "item_stock", "quantitySelected", "seller_id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
