const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\\\Users\\\\youin\\\\OneDrive\\\\바탕 화면\\\\822shop\\\\db\\\\database.sqlite');

db.serialize(() => {
    db.run("ATTACH DATABASE 'C:\\\\Users\\\\youin\\\\OneDrive\\\\바탕 화면\\\\catalog_app\\\\db\\\\database.sqlite' AS old_db");
    
    // Copy home_themes
    db.run("DELETE FROM home_themes");
    db.run("INSERT INTO home_themes SELECT * FROM old_db.home_themes");
    
    // Copy main_banners
    db.run("DELETE FROM main_banners");
    db.run("INSERT INTO main_banners SELECT * FROM old_db.main_banners");
    
    // Copy recommended_brands
    db.run("DELETE FROM recommended_brands");
    db.run("INSERT INTO recommended_brands SELECT * FROM old_db.recommended_brands");
    
    // Copy site_settings
    db.run("DELETE FROM site_settings");
    db.run("INSERT INTO site_settings SELECT * FROM old_db.site_settings");

    // Also settings if exists
    db.run("DELETE FROM settings", (err) => { if(err) console.log(err.message) });
    db.run("INSERT INTO settings SELECT * FROM old_db.settings", (err) => { if(err) console.log(err.message) });
    
    db.run("DETACH DATABASE old_db", () => {
        console.log("Successfully migrated UI settings tables from old DB to new DB!");
    });
});
