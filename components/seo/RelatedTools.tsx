import { SimpleGrid, Title, Box } from '@mantine/core';
import { ToolCard } from '@/components/tool/ToolCard';
import { TOOLS } from '@/config/tools.config';

interface RelatedToolsProps {
  currentToolId: string;
  category?: string;
  limit?: number;
}

export function RelatedTools({ currentToolId, category, limit = 6 }: RelatedToolsProps) {
  // Get related tools from the same category or similar tools
  const relatedTools = TOOLS.filter((tool) => {
    if (tool.id === currentToolId) return false;
    if (category && tool.category === category) return true;
    return false;
  }).slice(0, limit);

  if (relatedTools.length === 0) return null;

  return (
    <Box style={{ marginTop: '3rem' }}>
      <Title order={2} style={{ color: '#ffffff', marginBottom: '1.5rem', fontSize: '1.75rem' }}>
        Related Tools
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {relatedTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            title={tool.name}
            description={tool.description}
            href={tool.path}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
