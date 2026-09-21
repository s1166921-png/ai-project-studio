import type { Metadata } from 'next';
import Profile from './profile-client';
export const metadata:Metadata={title:'小杨 YANG — 山海之间，代码之外',description:'小杨的个人名片：AI 应用开发、5018 米雪山、OW/AOW 潜水、竞技运动、音乐与投资研究。'};
export default function Page(){return <Profile/>}
