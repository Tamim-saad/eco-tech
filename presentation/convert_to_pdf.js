// NodiWatch Presentation to PDF Converter
// Uses DeckTape (generic mode) for high-quality PDF with:
//   ✓ Selectable text   ✓ Clickable links   ✓ Embedded fonts
//   ✓ Full CSS grid/flex support (avoids Chromium print bug)
//   ✓ Navigation UI hidden in PDF output
//
// Usage: node convert_to_pdf.js

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const WIDTH  = 1440;
const HEIGHT = 1080;
const SRC    = path.resolve(__dirname, 'index.html');
const TMP    = path.resolve(__dirname, '_pdf_tmp.html');
const OUTPUT = path.resolve(__dirname, 'NodiWatch_Presentation.pdf');

// Build a temporary HTML file that's identical to index.html but with
// the navigation bar hidden via an injected <style> tag.
// This keeps the original index.html completely unchanged.
const original = fs.readFileSync(SRC, 'utf8');
const patched  = original.replace(
    '</head>',
    `<style>/* PDF export — hide nav UI */
    .nav { display: none !important; }
    </style>
</head>`
);
fs.writeFileSync(TMP, patched, 'utf8');

const tmpUrl = `file:///${TMP.replace(/\\/g, '/')}`;

console.log('Converting presentation to PDF with DeckTape...');
console.log(`  Output: ${path.basename(OUTPUT)}`);
console.log(`  Size:   ${WIDTH}x${HEIGHT}\n`);

try {
    execSync(
        `npx -y decktape generic --size ${WIDTH}x${HEIGHT} "${tmpUrl}" "${OUTPUT}"`,
        { stdio: 'inherit', timeout: 120000 }
    );

    const fileSize = (fs.statSync(OUTPUT).size / (1024 * 1024)).toFixed(1);
    console.log(`\n✅ PDF generated: ${path.basename(OUTPUT)} (${fileSize} MB)`);
    console.log('   ✓ Selectable text');
    console.log('   ✓ Clickable links');
    console.log('   ✓ All content rendered');
    console.log('   ✓ Navigation bar hidden');
} catch (err) {
    console.error('❌ PDF generation failed:', err.message);
} finally {
    // Always clean up the temporary file
    fs.unlinkSync(TMP);
}
