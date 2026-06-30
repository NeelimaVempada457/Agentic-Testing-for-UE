#!/usr/bin/env node
'use strict';

/**
 * setup-folders.js
 * Creates the features/ output folder structure for a given ticket ID.
 */

const fs   = require('fs');
const path = require('path');

const ticketId = (process.argv[2] || '').trim().toUpperCase();
if (!ticketId) {
  console.error('Usage: node setup-folders.js <TICKET-ID>');
  process.exit(1);
}

const featuresRoot = path.join(process.cwd(), 'features');
const dirs = [
  featuresRoot,
  path.join(featuresRoot, 'summaries'),
  path.join(featuresRoot, 'coverage'),
  path.join(featuresRoot, 'risks'),
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${path.relative(process.cwd(), dir)}`);
  } else {
    console.log(`Exists:  ${path.relative(process.cwd(), dir)}`);
  }
}

console.log(`\nFolder structure ready for ${ticketId}:`);
console.log(`  features/${ticketId}.feature`);
console.log(`  features/summaries/${ticketId}-summary.md`);
console.log(`  features/coverage/${ticketId}-coverage.json`);
console.log(`  features/risks/${ticketId}-risk-analysis.md`);
