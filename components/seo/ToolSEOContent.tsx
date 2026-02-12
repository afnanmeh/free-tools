import { Stack, Title, Text, Accordion, Box } from '@mantine/core';

interface FAQ {
  question: string;
  answer: string;
}

interface ToolSEOContentProps {
  toolName: string;
  description: string;
  howItWorks: string[];
  benefits: string[];
  useCases: string[];
  faqs: FAQ[];
}

export function ToolSEOContent({
  toolName,
  description,
  howItWorks,
  benefits,
  useCases,
  faqs,
}: ToolSEOContentProps) {
  return (
    <Stack gap="xl" style={{ marginTop: '3rem' }}>
      {/* What it does */}
      <Box>
        <Title order={2} style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.75rem' }}>
          What is {toolName}?
        </Title>
        <Text style={{ color: '#aaaaaa', lineHeight: 1.7, fontSize: '1rem' }}>
          {description}
        </Text>
      </Box>

      {/* How it works */}
      <Box>
        <Title order={2} style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.75rem' }}>
          How It Works
        </Title>
        <Stack gap="sm">
          {howItWorks.map((step, index) => (
            <Text key={index} style={{ color: '#aaaaaa', lineHeight: 1.7, fontSize: '1rem' }}>
              <strong style={{ color: '#F59E0B' }}>{index + 1}.</strong> {step}
            </Text>
          ))}
        </Stack>
      </Box>

      {/* Benefits */}
      <Box>
        <Title order={2} style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.75rem' }}>
          Key Benefits
        </Title>
        <Stack gap="sm">
          {benefits.map((benefit, index) => (
            <Text key={index} style={{ color: '#aaaaaa', lineHeight: 1.7, fontSize: '1rem' }}>
              • {benefit}
            </Text>
          ))}
        </Stack>
      </Box>

      {/* Use Cases */}
      <Box>
        <Title order={2} style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.75rem' }}>
          Common Use Cases
        </Title>
        <Stack gap="sm">
          {useCases.map((useCase, index) => (
            <Text key={index} style={{ color: '#aaaaaa', lineHeight: 1.7, fontSize: '1rem' }}>
              • {useCase}
            </Text>
          ))}
        </Stack>
      </Box>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <Box>
          <Title order={2} style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.75rem' }}>
            Frequently Asked Questions
          </Title>
          <Accordion
            variant="separated"
            styles={{
              item: {
                background: 'rgba(26, 26, 26, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
              },
              control: {
                color: '#ffffff',
                '&:hover': {
                  background: 'rgba(245, 158, 11, 0.1)',
                },
              },
              content: {
                color: '#aaaaaa',
                lineHeight: 1.7,
              },
              label: {
                fontWeight: 600,
              },
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion.Item key={index} value={`faq-${index}`}>
                <Accordion.Control>
                  <Title order={3} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {faq.question}
                  </Title>
                </Accordion.Control>
                <Accordion.Panel>{faq.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
      )}
    </Stack>
  );
}
