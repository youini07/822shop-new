const fs = require('fs');
const file = 'C:\\Users\\youin\\OneDrive\\바탕 화면\\822shop\\client\\src\\pages\\MyPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const oldDef = 'const getImageUrl = (imageUrl, thumbnailUrl) => {';
const newDef = 'const getImageUrl = (imageUrl, thumbnailUrl, code) => {\n    const cacheBuster = = + new Date().toISOString().split(T)[0];\n    if (code && code !== SHIPPING_FEE) return /static/thumbnails/ + code + .jpg? + cacheBuster;\n';
content = content.replace(oldDef, newDef);

content = content.replace(/getImageUrl\(it\.image_url,\s*it\.thumbnail_url\)/g, 'getImageUrl(it.image_url, it.thumbnail_url, it.code)');
content = content.replace(/getImageUrl\(product\.image_url,\s*product\.thumbnail_url\)/g, 'getImageUrl(product.image_url, product.thumbnail_url, product.code)');
content = content.replace(/getImageUrl\(item\.image_url,\s*item\.thumbnail_url\)/g, 'getImageUrl(item.image_url, item.thumbnail_url, item.product_code || item.code)');

content = content.replace(/<img([^>]*)src=\{getImageUrl([^>]*)(?<!onError=\{[^>]*)\/?>/g, (match, p1, p2) => {
    if (match.includes('onError')) return match;
    return <img + p1 + src={getImageUrl + p2 +  onError={(e) => { e.target.onerror = null; e.target.src = '/static/nophoto.png'; }} />;
});

fs.writeFileSync(file, content);
console.log('MyPage.jsx updated successfully!');
