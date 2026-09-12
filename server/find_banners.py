import sqlite3
import glob

db_files = [
    'C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite',
    'C:\\Users\\youin\\OneDrive\\바탕 화면\\822링크\\_old_homepage_backup\\db\\database.sqlite',
    'C:\\Users\\youin\\OneDrive\\바탕 화면\\catalog_app\\db\\database.sqlite',
    'C:\\Users\\youin\\OneDrive\\바탕 화면\\db\\database.sqlite',
    'C:\\Users\\youin\\OneDrive\\바탕 화면\\dreamstudiovtg\\db\\database.sqlite'
]

for db_file in db_files:
    try:
        conn = sqlite3.connect(db_file)
        c = conn.cursor()
        c.execute("SELECT COUNT(*) FROM main_banners")
        print(f"{db_file}: {c.fetchone()[0]} main_banners")
        conn.close()
    except Exception as e:
        print(f"{db_file}: Error - {e}")
