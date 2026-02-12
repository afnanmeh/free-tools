'use client';

import { useEffect, useRef } from 'react';
import { Container, Title, Text, Box, Stack, SimpleGrid, Group } from '@mantine/core';
import * as echarts from 'echarts';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
}

function MetricCard({ label, value, change, isPositive, color }: MetricCardProps) {
  return (
    <Box
      style={{
        padding: '1.25rem',
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
      }}
    >
      <Text
        style={{
          fontSize: '0.875rem',
          color: '#aaaaaa',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}
      >
        {label}
      </Text>
      <Group gap="sm" align="baseline">
        <Text
          style={{
            fontSize: '2rem',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1,
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: isPositive ? '#10b981' : '#ef4444',
          }}
        >
          {change}
        </Text>
      </Group>
    </Box>
  );
}

export function AnalyticsSection() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // Generate sample data for the last 30 days
    const dates: string[] = [];
    const toolUsage: number[] = [];
    const apiCalls: number[] = [];
    const activeUsers: number[] = [];
    const conversions: number[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Generate realistic-looking data with trends
      toolUsage.push(Math.floor(15000 + Math.random() * 5000 + i * 100));
      apiCalls.push(Math.floor(8000 + Math.random() * 3000 + i * 80));
      activeUsers.push(Math.floor(3000 + Math.random() * 1000 + i * 30));
      conversions.push(Math.floor(500 + Math.random() * 300 + i * 10));
    }

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        borderColor: 'rgba(245, 158, 11, 0.3)',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff',
          fontSize: 13,
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
          },
        },
      },
      legend: {
        data: ['Tool Usage', 'Active Users', 'Tools Available', 'Page Views'],
        textStyle: {
          color: '#aaaaaa',
          fontSize: 13,
        },
        top: 0,
        icon: 'circle',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        axisLabel: {
          color: '#aaaaaa',
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#aaaaaa',
          fontSize: 11,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      series: [
        {
          name: 'Tool Usage',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: '#F59E0B',
          },
          itemStyle: {
            color: '#F59E0B',
          },
          data: toolUsage,
        },
        {
          name: 'Active Users',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: '#EC4899',
          },
          itemStyle: {
            color: '#EC4899',
          },
          data: apiCalls,
        },
        {
          name: 'Tools Available',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: '#8B5CF6',
          },
          itemStyle: {
            color: '#8B5CF6',
          },
          data: activeUsers,
        },
        {
          name: 'Page Views',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: '#10b981',
          },
          itemStyle: {
            color: '#10b981',
          },
          data: conversions,
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  const metrics = [
    { label: 'Total Tool Usage', value: '18.5K', change: '+42.7%', isPositive: true, color: '#F59E0B' },
    { label: 'Active Users', value: '3.8K', change: '+35.2%', isPositive: true, color: '#EC4899' },
    { label: 'Tools Available', value: '95', change: '+12.5%', isPositive: true, color: '#8B5CF6' },
    { label: 'Page Views', value: '52K', change: '+28.9%', isPositive: true, color: '#10b981' },
  ];

  return (
    <section
      style={{
        backgroundColor: '#03060C',
        padding: '6rem 0',
        position: 'relative',
      }}
    >
      <Container size="xl">
        <Stack gap="3rem">
          {/* Header */}
          <Box style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <Text
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '1rem',
              }}
            >
              REAL-TIME INSIGHTS
            </Text>
            <Title
              order={2}
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '1rem',
                letterSpacing: '-1px',
              }}
            >
              Visualize usage through in-depth{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                analytics
              </span>
            </Title>
            <Text
              style={{
                fontSize: '1.125rem',
                color: '#aaaaaa',
                lineHeight: 1.6,
              }}
            >
              From high-performing tools to trending features, understand what drives user engagement.
            </Text>
          </Box>

          {/* Metrics Grid */}
          <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} spacing="lg">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </SimpleGrid>

          {/* Chart Container */}
          <Box
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '2rem',
              marginTop: '1rem',
            }}
          >
            <div
              ref={chartRef}
              style={{
                width: '100%',
                height: '400px',
              }}
            />
          </Box>

          {/* Opportunities Snapshot */}

        </Stack>
      </Container>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
