const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: 'https://www.teslaoutsourcingservices.com/images/case-study/bim-modeling-for-bcr-01.webp', filename: 'banner.webp' },
    { url: 'https://www.teslaoutsourcingservices.com/images/case-study/bim-modeling-for-bcr-02.webp', filename: 'img-1.webp' },
    { url: 'https://www.teslaoutsourcingservices.com/images/case-study/bim-modeling-for-bcr-03.webp', filename: 'img-2.webp' }
];

const downloadImage = (url, filename) => {
    const filePath = path.join(__dirname, 'images', filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${url}: Status Code ${response.statusCode}`);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath, () => { });
        console.error(`Error downloading ${url}: ${err.message}`);
    });
};

images.forEach(img => downloadImage(img.url, img.filename));
