import sqlite3
conn = sqlite3.connect('C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\db\\database.sqlite')
c = conn.cursor()
c.execute("SELECT code, thumbnail_url, image_url, product_images FROM products WHERE code LIKE 'TEMP_%' LIMIT 1")
print(c.fetchone())
conn.close()
