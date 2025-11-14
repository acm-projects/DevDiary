// Usage: node migrateLogs.js

import mongoose from 'mongoose';
import Log from './models/Log.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

await connectDB();

async function migrateLogs() {
    try {
        console.log('Starting migration...');
        
        // Find all logs that have the old sections structure
        const logs = await Log.find({});
        
        let migratedCount = 0;
        let skippedCount = 0;
        
        for (const log of logs) {
            if (Array.isArray(log.sections) && log.sections.length > 0) {
                console.log(`Skipping log ${log._id} - already migrated`);
                skippedCount++;
                continue;
            }
            
            // Check if log has old-style sections object
            if (log.sections && typeof log.sections === 'object' && !Array.isArray(log.sections)) {
                console.log(`Migrating log ${log._id}: ${log.title}`);
                
                const newSections = [];
                let order = 0;
                
                // Convert old sections to new format
                if (log.sections.error) {
                    newSections.push({
                        type: 'error',
                        content: log.sections.error,
                        order: order++
                    });
                }
                
                if (log.sections.code) {
                    newSections.push({
                        type: 'code',
                        content: log.sections.code,
                        order: order++
                    });
                }
                
                if (log.sections.solution) {
                    newSections.push({
                        type: 'solution',
                        content: log.sections.solution,
                        order: order++
                    });
                }
                
                if (log.sections.resources) {
                    newSections.push({
                        type: 'resources',
                        content: log.sections.resources,
                        order: order++
                    });
                }
                
                if (log.sections.comments) {
                    newSections.push({
                        type: 'comments',
                        content: log.sections.comments,
                        order: order++
                    });
                }
                
                // Save old sections as backup
                log.legacySections = log.sections;
                
                // Update to new format
                log.sections = newSections;
                await log.save();
                
                migratedCount++;
                console.log(`Migrated log ${log._id}`);
            } else {
                console.log(`Skipping log ${log._id} - no old sections to migrate`);
                skippedCount++;
            }
        }
        
        console.log('\nMigration Complete');
        console.log(`Total logs: ${logs.length}`);
        console.log(`Migrated: ${migratedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the migration
migrateLogs();