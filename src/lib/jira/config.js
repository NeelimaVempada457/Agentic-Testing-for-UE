'use strict';

require('dotenv').config();

const REQUIRED_VARS = ['JIRA_BASE_URL', 'JIRA_EMAIL', 'JIRA_API_TOKEN'];

function getConfig() {
  const missing = REQUIRED_VARS.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Copy .env.example to .env and fill in your Jira credentials.'
    );
  }

  return {
    baseUrl: process.env.JIRA_BASE_URL.replace(/\/$/, ''),
    email: process.env.JIRA_EMAIL,
    apiToken: process.env.JIRA_API_TOKEN,
  };
}

module.exports = { getConfig };
