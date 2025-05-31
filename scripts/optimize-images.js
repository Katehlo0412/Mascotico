import sharp from 'sharp';

async function optimizeAdopta3() {
  try {
    await sharp('public/images/adopta3.jpg')
      .webp({ 
        quality: 80,
        effort: 6,
        lossless: false
      })
      .toFile('public/images/adopta3.webp');
    console.log('✓ WebP generado: adopta3.webp');
  } catch (error) {
    console.error('Error durante la optimización:', error);
  }
}

optimizeAdopta3();