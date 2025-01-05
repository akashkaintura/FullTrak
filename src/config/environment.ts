export const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CACHE_TTL: 3600,
    MAX_QUERY_LIMIT: 1000,
};