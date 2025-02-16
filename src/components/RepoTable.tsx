'use client';
import { useQuery } from 'react-query';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorAlert from './ErrorAlert';
import { DateRange, useDateRange } from './GlobalDateRange';

export default function RepoTable() {
  const { range } = useDateRange();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['github-repos', range],
    queryFn: async () => {
      const response = await fetch(`/api/github?range=${range as DateRange}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
  });

  if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return <ErrorAlert message={errorMessage} />;
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Repository
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Stars
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Forks
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Language
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((repo: GitHubRepo) => (
            <tr
              key={repo.id}
              className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {repo.full_name}
                </a>
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-600">
                {repo.stargazers_count.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-600">
                {repo.forks_count.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center">
                {repo.language && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {repo.language}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
