const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite');
db.serialize(() => {
    db.run("ATTACH DATABASE 'C:\\Users\\youin\\OneDrive\\바탕 화면\\catalog_app\\db\\database.sqlite' AS old_db");
    db.run("INSERT OR IGNORE INTO home_themes SELECT * FROM old_db.home_themes");
    db.run("INSERT OR IGNORE INTO main_banners SELECT * FROM old_db.main_banners");
    db.run("INSERT OR IGNORE INTO recommended_brands SELECT * FROM old_db.recommended_brands");
    db.run("INSERT OR IGNORE INTO site_settings SELECT * FROM old_db.site_settings");
    db.get("SELECT COUNT(*) as c FROM home_themes", (err, row) => {
        console.log("home_themes count:", row ? row.c : err);
    });
});
