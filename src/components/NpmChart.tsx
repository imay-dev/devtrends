'use client';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DateRange, useDateRange } from './GlobalDateRange';
import ErrorAlert from './ErrorAlert';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = {
  react: '#61DAFB',
  vue: '#41B883',
  svelte: '#FF3E00',
  next: '#000000',
  typescript: '#3178C6',
  tailwindcss: '#06B6D4',
};

export default function NpmChart() {
  const { range } = useDateRange();

  const { data, isLoading, error } = useQuery<NpmPackage[]>({
    queryKey: ['npm-downloads', range],
    queryFn: async () => {
      const response = await fetch(`/api/npm?range=${range as DateRange}`);
      if (!response.ok) throw new Error('Failed to fetch npm data');
      return response.json();
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return <div className="h-64 bg-gray-50 rounded-lg animate-pulse" />;

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return <ErrorAlert message={errorMessage} />;
  }

  return (
    <div className="p-6 bg-white rounded-lg border">
      <div className="h-96">
        <Line
          data={{
            labels: data?.[0]?.downloads.map((d: any) => d.day),
            datasets:
              data?.map((pkg: any) => ({
                label: pkg.package,
                data: pkg.downloads.map((d: any) => d.downloads),
                borderColor: COLORS[pkg.package as keyof typeof COLORS],
                backgroundColor:
                  COLORS[pkg.package as keyof typeof COLORS] + '20',
                tension: 0.2,
                pointRadius: 0,
              })) || [],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
