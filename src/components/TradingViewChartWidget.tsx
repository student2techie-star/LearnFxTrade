'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  symbol?: string;
  theme?: 'dark' | 'light';
  height?: number;
}

export default function TradingViewChartWidget({
  symbol = 'BSE:SENSEX',
  theme = 'dark',
  height = 560,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget if any
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = `calc(100% - 32px)`;
    widgetContainer.style.width = '100%';
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'in',
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      backgroundColor: '#131722',
      gridColor: '#1e222d',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: 'tradingview_advanced_chart',
    });

    containerRef.current.appendChild(script);
  }, [symbol, theme]);

  return (
    <div
      className="tradingview-widget-container w-full rounded-2xl overflow-hidden border border-[#2a2e39] bg-[#131722]"
      style={{ height: `${height}px` }}
      ref={containerRef}
    />
  );
}
