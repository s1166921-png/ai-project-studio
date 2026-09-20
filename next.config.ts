import type { NextConfig } from 'next';
const nextConfig: NextConfig = { output: 'export', trailingSlash: true, basePath: process.env.GITHUB_PAGES === 'true' ? '/ai-project-studio' : '' };
export default nextConfig;
