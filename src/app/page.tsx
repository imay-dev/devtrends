import GlobalDateSelector from '@/components/GlobalDateSelector';
import { GitHubIcon, NpmIcon } from '@/components/Icons';
import NpmChart from '@/components/NpmChart';
import RepoTable from '@/components/RepoTable';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <GlobalDateSelector />

      {/* GitHub Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-2">
        <div className="flex items-center gap-2 mb-4">
          <GitHubIcon className="w-8 h-8 text-gray-800" />
          <h1 className="text-2xl font-bold text-gray-800">
            Trending Repositories
          </h1>
        </div>

        <RepoTable />
      </div>

      {/* npm Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <NpmIcon className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Package Downloads
          </h2>
        </div>
        <NpmChart />
      </div>
    </main>
  );
}
