const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // 4:3 aspect ratio as user requested (width:height)
    const WIDTH = 1440;
    const HEIGHT = 1080;

    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

    const filePath = path.resolve(__dirname, 'index.html');
    await page.goto(`file:///${filePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));

    // Get the total number of slides
    const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
    console.log(`Found ${slideCount} slides (${WIDTH}x${HEIGHT} — 4:3)`);

    // Create temp directory for screenshots
    const tmpDir = path.join(__dirname, '_tmp_slides');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const screenshotPaths = [];

    for (let i = 0; i < slideCount; i++) {
        // Activate the slide
        await page.evaluate((idx) => {
            document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nd .d').forEach(d => d.classList.remove('active'));
            const slides = document.querySelectorAll('.slide');
            slides[idx].classList.add('active');
            const dots = document.querySelectorAll('.nd .d');
            if (dots[idx]) dots[idx].classList.add('active');
        }, i);

        await new Promise(r => setTimeout(r, 600));

        // Hide nav bar and ensure slide fits without overflow clipping
        await page.evaluate((w, h) => {
            const nav = document.querySelector('.nav');
            if (nav) nav.style.display = 'none';

            // Make sure the active slide doesn't clip content
            const slide = document.querySelector('.slide.active');
            if (slide) {
                slide.style.overflow = 'visible';
                slide.style.height = 'auto';
                slide.style.minHeight = h + 'px';
            }
        }, WIDTH, HEIGHT);

        // Check if the slide content overflows and capture the full content
        const slideHeight = await page.evaluate(() => {
            const slide = document.querySelector('.slide.active');
            return slide ? slide.scrollHeight : 0;
        });

        // If content is taller than viewport, capture full page of that slide
        // by temporarily resizing the viewport
        let screenshotPath = path.join(tmpDir, `slide_${String(i).padStart(2, '0')}.png`);

        if (slideHeight > HEIGHT) {
            // Temporarily resize viewport to fit all content
            await page.setViewport({ width: WIDTH, height: slideHeight, deviceScaleFactor: 2 });
            await new Promise(r => setTimeout(r, 300));
        }

        await page.screenshot({
            path: screenshotPath,
            type: 'png',
            clip: { x: 0, y: 0, width: WIDTH, height: Math.max(HEIGHT, slideHeight) }
        });
        screenshotPaths.push(screenshotPath);

        const status = slideHeight > HEIGHT ? ` (expanded: ${slideHeight}px)` : '';
        console.log(`  Captured slide ${i + 1}/${slideCount}${status}`);

        // Reset viewport if we changed it
        if (slideHeight > HEIGHT) {
            await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
            await new Promise(r => setTimeout(r, 200));
        }

        // Show nav again and reset slide styles
        await page.evaluate(() => {
            const nav = document.querySelector('.nav');
            if (nav) nav.style.display = '';
            const slide = document.querySelector('.slide.active');
            if (slide) {
                slide.style.overflow = '';
                slide.style.height = '';
                slide.style.minHeight = '';
            }
        });
    }

    await browser.close();
    console.log('\nAssembling PDF...');

    // Use pdf-lib to create the final PDF
    const pdfDoc = await PDFDocument.create();

    for (let i = 0; i < screenshotPaths.length; i++) {
        const imgBytes = fs.readFileSync(screenshotPaths[i]);
        const pngImage = await pdfDoc.embedPng(imgBytes);

        // Get actual image dimensions to calculate correct page aspect
        const imgWidth = pngImage.width;
        const imgHeight = pngImage.height;

        // PDF page: scale to fit WIDTH=720pt (10 inches), keep aspect ratio
        const pageWidth = 720;
        const pageHeight = pageWidth * (imgHeight / imgWidth);
        const pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);

        pdfPage.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(__dirname, 'presentation.pdf');
    fs.writeFileSync(outputPath, pdfBytes);

    const fileSize = (pdfBytes.length / (1024 * 1024)).toFixed(1);
    console.log(`PDF generated: presentation.pdf (${slideCount} slides, ${fileSize} MB, 4:3 ratio)`);

    // Cleanup temp files
    for (const p of screenshotPaths) fs.unlinkSync(p);
    fs.rmdirSync(tmpDir);
    console.log('Cleaned up temporary files.');
})();
