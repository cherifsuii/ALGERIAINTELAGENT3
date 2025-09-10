import React, { useEffect, useRef } from 'react';
import { ActivitySystemIcon } from './icons/ActivitySystemIcon';
import { ActivityCommandIcon } from './icons/ActivityCommandIcon';
import { ActivityErrorIcon } from './icons/ActivityErrorIcon';

interface ActivityMonitorProps {
    logs: string[];
}

const LogLine: React.FC<{ log: string }> = ({ log }) => {
    let textColor = 'text-text-secondary';
    let Icon = ActivitySystemIcon;

    if (log.includes('[CMD]')) {
        textColor = 'text-accent';
        Icon = ActivityCommandIcon;
    } else if (log.includes('[ERR]')) {
        textColor = 'text-danger';
        Icon = ActivityErrorIcon;
    }

    return (
        <div className="flex items-start space-x-2">
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${textColor}`} />
            <p className={`flex-1 text-xs ${textColor}`}>{log}</p>
        </div>
    );
};


export const ActivityMonitor: React.FC<ActivityMonitorProps> = ({ logs }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <aside className="w-[420px] bg-panel border-l border-border p-4 flex flex-col shrink-0 hidden lg:flex">
            <h2 className="text-sm font-semibold tracking-wider text-text-primary mb-4">EVENT LOG</h2>
            <div ref={logContainerRef} className="flex-1 space-y-3 overflow-y-auto pr-2">
                {logs.map((log, index) => (
                    <LogLine key={index} log={log} />
                ))}
            </div>
        </aside>
    );
};