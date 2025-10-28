
import React from 'react';

const iconProps = {
    className:"inline-block",
    width:"24",
    height:"24",
    viewBox:"0 0 24 24",
    fill:"none",
    stroke:"currentColor",
    strokeWidth:"2",
    strokeLinecap:"round",
    strokeLinejoin:"round"
} as const;

export const MailIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
export const CpuIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>
);
export const Layers3Icon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.84l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/><path d="m22 17.65-8.58-3.9a2 2 0 0 0-1.66 0L3.2 17.65a1 1 0 0 0 0 1.84l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/><path d="m22 12.65-8.58-3.9a2 2 0 0 0-1.66 0L3.2 12.65a1 1 0 0 0 0 1.84l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/></svg>
);
export const BrainCircuitIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M12 5a3 3 0 1 0-5.993.142M12 5a3 3 0 1 1-5.993.142m5.993-.142A3 3 0 1 0 12 5Zm0 0V3m0 2v2m0 5a3 3 0 1 1 5.993-.142M12 10a3 3 0 1 0 5.993-.142m-5.993.142A3 3 0 1 1 12 10Zm0 0v-2m0 2v2m-3 5a3 3 0 1 0-5.993.142M9 15a3 3 0 1 1-5.993.142m5.993-.142A3 3 0 1 0 9 15Zm0 0v-2m0 2v2m9-5a3 3 0 1 1 5.993-.142M18 10a3 3 0 1 0 5.993-.142m-5.993.142A3 3 0 1 1 18 10Zm0 0v-2m0 2v2m-3 5a3 3 0 1 0 5.993.142M15 15a3 3 0 1 1 5.993.142m-5.993.142A3 3 0 1 0 15 15Zm0 0v-2m0 2v2M4.5 9.5v-3m0 3v3m15-3v-3m0 3v3M12 17v3m0-11V3"/></svg>
);
export const WorkflowIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
);
export const NetworkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
);
export const GemIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.5 8.5 17 0"/></svg>
);
export const HeartPulseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M22 12h-2.5l-2.1-6.6a.5.5 0 0 0-.9-.3L13.2 12H11l-1.6-4.2a.5.5 0 0 0-.9-.3L6 12H2"/><path d="M20.5 12.5c0-1.5-2-2.5-4-2.5s-4 1-4 2.5 2 2.5 4 2.5 4-1 4-2.5z"/><path d="M2 12.5c0-1.5 2-2.5 4-2.5s4 1 4 2.5-2 2.5-4 2.5-4-1-4-2.5z"/></svg>
);
export const ShieldCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
export const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
export const MonitorHeartRateIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M3 3h18v12H3z"/><path d="M7 9h2l2 6 2-4 2 2h2"/><path d="M12 18h12"/><path d="M3 12h12"/></svg>
);
export const LayoutDashboardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
export const TrendingUpIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
export const BarChart3Icon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
export const TableIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
);
export const CheckCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
);
export const CoinsIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.75A6 6 0 1 1 12 18"/><path d="M16 8h.01"/><path d="M19 12h.01"/><path d="M17 15h.01"/><path d="m14 17.5.01-.01"/></svg>
);
export const PieChartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);
export const RocketIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.64-.75-2.2-1.34-3.05-.05Z"/><path d="m12 15-3-3a9 9 0 0 1 3-13 9 9 0 0 1 13 3l-3 3a5 5 0 0 1-10 10z"/></svg>
);
export const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const MapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
);
export const FileCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>
);
export const LineChartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);
