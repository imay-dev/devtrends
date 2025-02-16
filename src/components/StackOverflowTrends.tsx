// components/StackOverflowTrends.tsx
'use client';
import { useQuery } from 'react-query';
import { useDateRange } from '@/components/GlobalDateRange';

interface StackTag {
  name: string;
  count: number;
}

interface StackQuestion {
  question_id: number;
  title: string;
  link: string;
  tags: string[];
  score: number;
}

export default function StackOverflowTrends() {
  const { range } = useDateRange();

  const { data, isLoading, error } = useQuery<{
    tags?: StackTag[];
    questions?: StackQuestion[];
  }>({
    queryKey: ['stackoverflow', range],
    queryFn: () =>
      fetch(`/api/stackoverflow?range=${range}`).then((res) => res.json()),
  });

  if (isLoading)
    return <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />;

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
        Failed to load Stack Overflow trends
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      {/* Tags Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-4">
          Trending Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {(data?.tags || []).map(
            (
              tag // Added fallback empty array
            ) => (
              <span
                key={tag.name}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {tag.name} ({tag.count.toLocaleString()})
              </span>
            )
          )}
        </div>
      </div>

      {/* Questions Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-4">
          Recent Popular Questions
        </h3>
        <div className="space-y-4">
          {(data?.questions || []).map(
            (
              question // Added fallback empty array
            ) => (
              <a
                key={question.question_id}
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.title }}
                  ></span>
                  <span className="text-sm text-gray-500 ml-4">
                    {question.score} votes
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
