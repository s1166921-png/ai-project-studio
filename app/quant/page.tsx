import type {Metadata} from 'next';
import Dashboard from './dashboard';
import './quant.css';
export const metadata:Metadata={title:'AI 量化交易 · 虚拟盘观察台 — YANG',description:'从模型筛选到虚拟执行：策略曲线、交易复盘与可追溯的数据口径。'};
export default function QuantPage(){return <Dashboard/>}
