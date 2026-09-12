import sqlite3
try:
    conn = sqlite3.connect('C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite')
    c = conn.cursor()
    
    # Get column names for home_themes
    c.execute("PRAGMA table_info(home_themes)")
    new_cols = [row[1] for row in c.fetchall()]
    
    c.execute("ATTACH DATABASE 'C:\\Users\\youin\\OneDrive\\바탕 화면\\catalog_app\\db\\database.sqlite' AS old_db")
    c.execute("PRAGMA old_db.table_info(home_themes)")
    old_cols = [row[1] for row in c.fetchall()]
    
    common_cols = [col for col in old_cols if col in new_cols]
    cols_str = ', '.join(common_cols)
    
    c.execute("DELETE FROM home_themes")
    c.execute(f"INSERT INTO home_themes ({cols_str}) SELECT {cols_str} FROM old_db.home_themes")
    
    # Repeat for main_banners
    c.execute("PRAGMA table_info(main_banners)")
    new_cols_mb = [row[1] for row in c.fetchall()]
    c.execute("PRAGMA old_db.table_info(main_banners)")
    old_cols_mb = [row[1] for row in c.fetchall()]
    common_cols_mb = [col for col in old_cols_mb if col in new_cols_mb]
    cols_str_mb = ', '.join(common_cols_mb)
    c.execute("DELETE FROM main_banners")
    c.execute(f"INSERT INTO main_banners ({cols_str_mb}) SELECT {cols_str_mb} FROM old_db.main_banners")
    
    # Repeat for recommended_brands
    c.execute("PRAGMA table_info(recommended_brands)")
    new_cols_rb = [row[1] for row in c.fetchall()]
    c.execute("PRAGMA old_db.table_info(recommended_brands)")
    old_cols_rb = [row[1] for row in c.fetchall()]
    common_cols_rb = [col for col in old_cols_rb if col in new_cols_rb]
    cols_str_rb = ', '.join(common_cols_rb)
    c.execute("DELETE FROM recommended_brands")
    c.execute(f"INSERT INTO recommended_brands ({cols_str_rb}) SELECT {cols_str_rb} FROM old_db.recommended_brands")

    # Repeat for site_settings
    c.execute("PRAGMA table_info(site_settings)")
    new_cols_ss = [row[1] for row in c.fetchall()]
    c.execute("PRAGMA old_db.table_info(site_settings)")
    old_cols_ss = [row[1] for row in c.fetchall()]
    common_cols_ss = [col for col in old_cols_ss if col in new_cols_ss]
    cols_str_ss = ', '.join(common_cols_ss)
    c.execute("DELETE FROM site_settings")
    c.execute(f"INSERT INTO site_settings ({cols_str_ss}) SELECT {cols_str_ss} FROM old_db.site_settings")

    conn.commit()
    
    c.execute("SELECT COUNT(*) FROM home_themes")
    print(f"home_themes count: {c.fetchone()[0]}")
    
    conn.close()
    print("Python SQLite migration complete!")
except Exception as e:
    print(f"Error: {e}")
