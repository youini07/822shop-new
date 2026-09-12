const fs = require('fs');
const file = 'C:\\\\Users\\\\youin\\\\OneDrive\\\\바탕 화면\\\\822shop\\\\client\\\\src\\\\pages\\\\MyPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Update function definition
content = content.replace(
    'const getImageUrl = (imageUrl, thumbnailUrl) => {',
    'const getImageUrl = (imageUrl, thumbnailUrl, code) => {\n    if (code && code !== \"SHIPPING_FEE\") return /static/thumbnails/ + code + .jpg?v= + new Date().toISOString().split(\"T\")[0];'
);

// Update calls
content = content.replace(/getImageUrl\(it\.image_url,\s*it\.thumbnail_url\)/g, 'getImageUrl(it.image_url, it.thumbnail_url, it.code)');
content = content.replace(/getImageUrl\(product\.image_url,\s*product\.thumbnail_url\)/g, 'getImageUrl(product.image_url, product.thumbnail_url, product.code)');
content = content.replace(/getImageUrl\(item\.image_url,\s*item\.thumbnail_url\)/g, 'getImageUrl(item.image_url, item.thumbnail_url, item.product_code || item.code)');

// Add onError to img tags lacking it
content = content.replace(/<img([^>]*)src=\{getImageUrl([^>]*)(?<!onError=\{[^>]*)\/?>/g, (match, p1, p2) => {
    if (match.includes('onError')) return match; // Already has it
    return <imgsrc={getImageUrl onError={(e) => { e.target.onerror = null; e.target.src = '/static/nophoto.png'; }} />;
});

fs.writeFileSync(file, content);
console.log('Done replacing getImageUrl in MyPage.jsx');
