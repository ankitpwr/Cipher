import Redis from "ioredis";

const redis = new Redis(
  "rediss://default:ASitAAIjcDFjZmZmYWUxZGQ1Yjg0YmIyYjc0ODA2MGZmOTc3N2EyZXAxMA@cool-gull-10413.upstash.io:6379"
);
export default redis;
