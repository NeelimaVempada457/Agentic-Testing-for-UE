'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TICKET_SUBDIRS = [
  'Summary',
  'Comments',
  'Attachments',
  'Links',
  'Metadata',
  'Subtasks',
  'Logs',
];

class FileManager {
  constructor(outputDir, logger) {
    this.outputDir = outputDir;
    this.logger = logger;
    this._seenHashes = new Set();
  }

  // ─── Directory helpers ────────────────────────────────────────────────────────

  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      this.logger.debug(`mkdir: ${dirPath}`);
    }
  }

  setupTicketFolders(ticketId) {
    const base = path.join(this.outputDir, ticketId);
    this.ensureDir(base);
    for (const sub of TICKET_SUBDIRS) {
      this.ensureDir(path.join(base, sub));
    }
    this.logger.info(`Folder structure ready: ${base}`);
    return base;
  }

  // ─── Writers ──────────────────────────────────────────────────────────────────

  writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    this.logger.debug(`JSON saved: ${path.basename(filePath)}`);
  }

  writeMarkdown(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
    this.logger.debug(`MD saved:   ${path.basename(filePath)}`);
  }

  writeBuffer(filePath, buffer) {
    fs.writeFileSync(filePath, buffer);
    this.logger.debug(`Binary saved: ${path.basename(filePath)}`);
  }

  // ─── Attachment helpers ───────────────────────────────────────────────────────

  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  isDuplicate(buffer) {
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    if (this._seenHashes.has(hash)) return true;
    this._seenHashes.add(hash);
    return false;
  }

  sanitizeFilename(name) {
    // Remove characters illegal on Windows and POSIX
    return name
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
      .replace(/\s+/g, '_')
      .trim()
      .slice(0, 200);   // cap length
  }

  resolveUniqueFilename(dir, filename) {
    let dest = path.join(dir, filename);
    if (!fs.existsSync(dest)) return dest;

    const ext  = path.extname(filename);
    const base = path.basename(filename, ext);
    let counter = 1;
    while (fs.existsSync(dest)) {
      dest = path.join(dir, `${base}_${counter}${ext}`);
      counter++;
    }
    return dest;
  }
}

module.exports = { FileManager };
