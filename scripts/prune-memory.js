#!/usr/bin/env node

/**
 * Memory Pruning Script
 * Automatically archives stale tasks and entries from MEMORY.md
 * Keeps active items current and reduces context load
 * 
 * Usage: node scripts/prune-memory.js
 * Run weekly or before major sessions
 */

const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, '../data/workspace/MEMORY.md');
const ARCHIVE_DIR = path.join(__dirname, '../data/workspace/memory-archive');
const STALE_THRESHOLD_DAYS = 30;

// Ensure archive directory exists
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

// Parse date from YYYY-MM-DD format
const parseDate = (dateStr) => {
  const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return new Date(match[1], parseInt(match[2]) - 1, match[3]);
};

// Check if date is older than threshold
const isStale = (dateStr) => {
  const date = parseDate(dateStr);
  if (!date) return false;
  const now = new Date();
  const diffDays = (now - date) / (1000 * 60 * 60 * 24);
  return diffDays > STALE_THRESHOLD_DAYS;
};

// Main pruning logic
const pruneMemory = () => {
  const content = fs.readFileSync(MEMORY_FILE, 'utf8');
  const lines = content.split('\n');
  
  const sections = {
    active: [],
    archived: []
  };
  
  let currentSection = 'active';
  let buffer = [];
  let sectionTitle = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect section headers (##)
    if (line.startsWith('##')) {
      sectionTitle = line;
      
      // Check if this looks like a stale section
      if (
        line.includes('Paused') ||
        line.includes('paused') ||
        line.includes('Old') ||
        line.includes('old')
      ) {
        // Extract date if present
        const dateMatch = line.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch && isStale(dateMatch[0])) {
          currentSection = 'archived';
        }
      }
      
      // Don't archive these critical sections
      if (
        line.includes('Purpose') ||
        line.includes('User Profile') ||
        line.includes('Operating Policy') ||
        line.includes('Performance') ||
        line.includes('Business') ||
        line.includes('Opportunity Radar') ||
        line.includes('Trinity') ||
        line.includes('Core Philosophy')
      ) {
        currentSection = 'active';
      }
    }
    
    // Add line to current buffer
    if (currentSection === 'archived' && line.match(/^##[^#]/)) {
      // Push previous buffer if it has content
      if (buffer.length > 0) {
        sections[currentSection].push(buffer.join('\n'));
        buffer = [];
      }
    }
    
    buffer.push(line);
  }
  
  // Push remaining buffer
  if (buffer.length > 0) {
    sections[currentSection].push(buffer.join('\n'));
  }
  
  // Write archives
  if (sections.archived.length > 0) {
    const timestamp = new Date().toISOString().split('T')[0];
    const archiveFile = path.join(ARCHIVE_DIR, `archive-${timestamp}.md`);
    const archiveContent = `# Memory Archive — ${timestamp}\n\n` + sections.archived.join('\n\n');
    fs.writeFileSync(archiveFile, archiveContent);
    console.log(`✅ Archived ${sections.archived.length} stale section(s) → ${archiveFile}`);
  }
  
  // Write cleaned MEMORY.md
  const activeContent = sections.active.join('\n\n');
  fs.writeFileSync(MEMORY_FILE, activeContent.trim() + '\n');
  
  console.log(`✅ Memory pruned. Kept ${sections.active.length} active section(s).`);
  console.log(`📊 Archive location: ${ARCHIVE_DIR}`);
};

// Run pruning
try {
  pruneMemory();
} catch (error) {
  console.error('❌ Error during memory pruning:', error.message);
  process.exit(1);
}
