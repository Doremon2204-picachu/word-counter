import fs from 'node:fs/promises';
import path from 'node:path';

async function countFileStats() {
  const filename = process.argv[2];

  if (!filename) {
    console.log('Error: Please provide a filename.');
    console.log('Usage: npm start <filename>');
    process.exit(1);
  }

  try {
    const filePath = path.resolve(filename);
    const content = await fs.readFile(filePath, 'utf-8');

    const lines = content.length === 0 ? 0 : content.split(/\r?\n/).length;
    const words = content.trim().length === 0 ? 0 : content.trim().split(/\s+/).length;
    const characters = content.length;

    console.log(`File: ${filename}`);
    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: File '${filename}' not found.`);
    } else {
      console.error(`An error occurred while reading the file:`, error.message);
    }
    process.exit(1);
  }
}

countFileStats();