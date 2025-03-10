// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';


// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_URL!,
//   token: process.env.UPSTASH_REDIS_TOKEN!,
// });

// export async function rateLimitingMiddleware(request: NextRequest) {
//   const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
//   const limit = 10;
//   const window = 60; 

//   const key = `rate_limit:${ip}`;
//   const current = await redis.incr(key);
  
//   if (current > limit) {
//     return new NextResponse('Too Many Requests', { status: 429 });
//   }

//   if (current === 1) {
//     await redis.expire(key, window);
//   }

//   return NextResponse.next();
// }