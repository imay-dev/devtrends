// app/api/npm/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { format, subDays } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'week';

  // Calculate date range
  const endDate = new Date();
  const startDate = subDays(endDate, {
    week: 7,
    month: 30,
    year: 365
  }[range as keyof object] || 7);

  const packages = ["node", "express", "angular", "react", "vue", "svelte", "next"];

  try {
    const downloadData = await Promise.all(
      packages.map(async (pkg) => {
        const { data } = await axios.get(
          `https://api.npmjs.org/downloads/range/${format(startDate, "yyyy-MM-dd")}:${format(endDate, "yyyy-MM-dd")}/${pkg}`
        );
        return {
          package: pkg,
          downloads: data.downloads,
        };
      })
    );
    return NextResponse.json(downloadData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch npm data" },
      { status: 500 }
    );
  }
}