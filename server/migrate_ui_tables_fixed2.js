const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite');
db.serialize(() => {
    db.run("ATTACH DATABASE 'C:\\Users\\youin\\OneDrive\\바탕 화면\\catalog_app\\db\\database.sqlite' AS old_db", (err) => { if(err) console.error('ATTACH:', err); });
    
    db.run("DELETE FROM home_themes");
    db.run("INSERT INTO home_themes SELECT * FROM old_db.home_themes", (err) => { if(err) console.error('INSERT home_themes:', err); });
    
    db.run("DELETE FROM main_banners");
    db.run("INSERT INTO main_banners SELECT * FROM old_db.main_banners", (err) => { if(err) console.error('INSERT main_banners:', err); });
    
    db.run("DELETE FROM recommended_brands");
    db.run("INSERT INTO recommended_brands SELECT * FROM old_db.recommended_brands", (err) => { if(err) console.error('INSERT recommended_brands:', err); });
    
    db.run("DELETE FROM site_settings");
    db.run("INSERT INTO site_settings SELECT * FROM old_db.site_settings", (err) => { 
        if(err) console.error('INSERT site_settings:', err); 
        console.log("Migration complete!");
    });
});
