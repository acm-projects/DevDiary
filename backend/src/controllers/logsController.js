export function getAllLogs(req, res) {
    res.status(200).send("Fetched # logs");
};

export function createLog(req, res) {
    res.status(201).json({ message: "Log created successfully"});
};

export function updateLog(req, res) {
    res.status(200).json({ message: "Log updated successfully"});
};

export function deleteLog(req, res) {
    res.status(200).json({ message: "Log deleted successfully"});
};