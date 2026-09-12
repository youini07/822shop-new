const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite');
db.get("SELECT code, thumbnail_url, image_url, product_images FROM products WHERE code LIKE 'TEMP_%' LIMIT 1", (err, row) => {
    console.log(row);
});
