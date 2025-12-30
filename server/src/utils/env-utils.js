export function env_utils() {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;


    return { ACCESS_TOKEN, REFRESH_TOKEN };
}