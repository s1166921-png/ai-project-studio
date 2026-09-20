import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'YANG — AI 应用开发与工程实践', description: '小杨的个人项目库：AI 融资匹配、内容工程、财务自动化与机器学习实验。' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="zh-CN" className="light"><body>{children}</body></html> }

