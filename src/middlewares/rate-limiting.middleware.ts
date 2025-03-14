import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import * as configEnv from '@/config/env';

type RateLimitConfig = {
  limit: number;
  window: number; 
};


export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = { limit: 5, window: 60 }
) {
    const redis = new Redis({
        url: configEnv.default.redis.url,
        token: configEnv.default.redis.token
      });

  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  
  const key = `rate-limit:${ip}:${request.nextUrl.pathname}`;
  
  const currentRequests = await redis.incr(key);
  
  if (currentRequests === 1) {
    await redis.expire(key, config.window);
  }
  
  const ttl = await redis.ttl(key);
  
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', config.limit.toString());
  headers.set('X-RateLimit-Remaining', Math.max(0, config.limit - currentRequests).toString());
  headers.set('X-RateLimit-Reset', ttl.toString());

  if (currentRequests > config.limit) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { 
        status: 429, 
        headers 
      }
    );
  }
  
  return { headers };
}