import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("api-rate-limit");
        if (!success) {
            return res.status(429).send("Rate limit exceeded");
        }
        next();
    } catch (error) {
        res.status(429).send("Rate limit exceeded");
        next(error);
    }
}

export default rateLimiter;