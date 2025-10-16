import Log from '../models/Log.js';
import mongoose from 'mongoose';
import { search } from '../models/SearchFeature.js';
import Search from '../models/Search.js';

export async function performSearch(req, res) {
    try {
        const { searchContent } = req.body;
        let tagsData = { similar_logs: [] };
        try {
            tagsData = await search(searchContent);
        } catch (err) {
            console.error("Failed:", err.message);
        }

        const logIDs = (tagsData.similar_logs || []).filter(id =>mongoose.Types.ObjectId.isValid(id));

        if (logIDs.length === 0) {
            return res.status(200).json([]); // no results found
        }

        const logs = await Log.find({ _id: { $in: logIDs } });

        const newSearch = new Search({ searchContent, logID: logIDs });

        const savedSearch = await newSearch.save();
        res.status(201).json(logs);
    }
    catch (error) {
        console.error("Error creating search:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};