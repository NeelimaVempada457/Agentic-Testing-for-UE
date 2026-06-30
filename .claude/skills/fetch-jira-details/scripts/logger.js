'use strict';

const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir) {
    this.logDir = logDir;
    this.logFile = path.join(logDir, 'execution.log');
    this._ensureDir();
  }

  _ensureDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  _write(level, message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.padEnd(7)}] ${message}`;
    const colored = this._colorize(level, line);
    console.log(colored);
    try {
      fs.appendFileSync(this.logFile, line + '\n', 'utf8');
    } catch {
      // If log file isn't writable yet, silently continue
    }
  }

  _colorize(level, text) {
    // ANSI color codes for terminal output
    const colors = {
      INFO:    '\x1b[36m',  // Cyan
      WARN:    '\x1b[33m',  // Yellow
      ERROR:   '\x1b[31m',  // Red
      SUCCESS: '\x1b[32m',  // Green
      DEBUG:   '\x1b[90m',  // Gray
    };
    const reset = '\x1b[0m';
    return `${colors[level] || ''}${text}${reset}`;
  }

  info(msg)    { this._write('INFO', msg); }
  warn(msg)    { this._write('WARN', msg); }
  error(msg)   { this._write('ERROR', msg); }
  success(msg) { this._write('SUCCESS', msg); }
  debug(msg)   {
    if (process.env.DEBUG === 'true') {
      this._write('DEBUG', msg);
    }
  }

  separator(label = '') {
    const line = label
      ? `${'─'.repeat(20)} ${label} ${'─'.repeat(20)}`
      : '─'.repeat(50);
    this._write('INFO', line);
  }
}

module.exports = { Logger };
