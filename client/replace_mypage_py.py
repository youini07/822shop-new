import re

file_path = 'C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\client\\src\\pages\\MyPage.jsx'
with open(file_path, 'r', encoding='utf8') as f:
    content = f.read()

# Update getImageUrl definition
old_def = "const getImageUrl = (imageUrl, thumbnailUrl) => {"
new_def = "const getImageUrl = (imageUrl, thumbnailUrl, code) => {\n    const cacheBuster = = + new Date().toISOString().split('T')[0];\n    if (code && code !== 'SHIPPING_FEE') return /static/thumbnails/.jpg?;"
content = content.replace(old_def, new_def)

# Replace calls
content = re.sub(r'getImageUrl\(it\.image_url,\s*it\.thumbnail_url\)', 'getImageUrl(it.image_url, it.thumbnail_url, it.code)', content)
content = re.sub(r'getImageUrl\(product\.image_url,\s*product\.thumbnail_url\)', 'getImageUrl(product.image_url, product.thumbnail_url, product.code)', content)
content = re.sub(r'getImageUrl\(item\.image_url,\s*item\.thumbnail_url\)', 'getImageUrl(item.image_url, item.thumbnail_url, item.product_code || item.code)', content)

# Add onError where missing
import functools
def replace_img(match):
    m = match.group(0)
    if 'onError=' in m:
        return m
    return m.replace('/>', ' onError={(e) => { e.target.onerror = null; e.target.src = \\'/static/nophoto.png\\'; }} />')

content = re.sub(r'<img[^>]*getImageUrl[^>]*/>', replace_img, content)

with open(file_path, 'w', encoding='utf8') as f:
    f.write(content)

print("MyPage.jsx updated successfully!")
