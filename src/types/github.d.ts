interface GitHubRepo {
  id: number;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}