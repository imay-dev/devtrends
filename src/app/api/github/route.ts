// app/api/github/route.ts
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "week";

  // Map range to days
  const rangeToDays = {
    week: 7,
    month: 30,
    year: 365
  };

  // Calculate start date
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - rangeToDays[range as keyof typeof rangeToDays]);
  const formattedDate = startDate.toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    const response = await octokit.request("GET /search/repositories", {
      q: `created:>=${formattedDate}`,
      sort: "stars",
      order: "desc",
      per_page: 10
    });

    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}