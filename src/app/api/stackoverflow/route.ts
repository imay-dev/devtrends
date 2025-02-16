// app/api/stackoverflow/route.ts
import { NextResponse } from "next/server";
import { subDays } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'week';
  const API_KEY = process.env.STACK_EXCHANGE_KEY;
  const SITE = 'stackoverflow';

  // Calculate date range
  const rangeDays = {
    week: 7,
    month: 30,
    year: 365
  }[range] || 7;

  const fromDate = Math.floor(subDays(new Date(), rangeDays).getTime() / 1000);

  try {
    // Get tags popular in the date range
    const tagsResponse = await fetch(
      `https://api.stackexchange.com/2.3/tags?` +
      `order=desc&sort=popular&site=${SITE}&key=${API_KEY}&` +
      `fromdate=${fromDate}`
    );
    
    // Get questions from the date range
    const questionsResponse = await fetch(
      `https://api.stackexchange.com/2.3/questions?` +
      `order=desc&sort=votes&site=${SITE}&key=${API_KEY}&` +
      `fromdate=${fromDate}&filter=withbody`
    );

    const [tagsData, questionsData] = await Promise.all([
      tagsResponse.json(),
      questionsResponse.json()
    ]);

    return NextResponse.json({
      tags: tagsData.items?.slice(0, 10) || [],
      questions: questionsData.items?.slice(0, 5) || [],
      range
    });

  } catch (error) {
    return NextResponse.json({
      tags: [],
      questions: [],
      error: "Failed to fetch Stack Overflow data"
    }, { status: 500 });
  }
}