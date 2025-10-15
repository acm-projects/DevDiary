import Log from '../models/Log.js';
import mongoose from 'mongoose';
import { search } from '../models/SearchFeature.js';
import Search from '../models/Search.js';

export async function performSearch(req, res) {
    try {
        const { searchContent } = req.body;

        let tagsData = { logIDs: [] };

        try {
          tagsData = await search(searchContent);
        } catch (err) {
            console.error("Failed:", err.message);
        }
        const newSearch = new Search({ searchContent, logID: tagsData.similar_logs || [] });

        const savedSearch = await newSearch.save();
        res.status(201).json(savedSearch);
    }
    catch (error) {
        console.error("Error creating search:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};