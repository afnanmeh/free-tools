"use client";

import { useState } from "react";
import { Stack, Button, Paper, Text, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { ToolHeader } from "@/components/tool/ToolHeader";
import { calculateAge } from "@/lib/tools/calculators/general";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (birthDate) {
      const calc = calculateAge(birthDate);
      setResult(calc);
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="AGE CALCULATOR"
        description="Compute age from date of birth. Calculate exact age in years, months, and days."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "General Utilities", href: "/calculators/general-utils" },
          {
            label: "Age Calculator",
            href: "/calculators/general-utils/age-calculator",
          },
        ]}
      />

      <Stack gap="xl">
        <DatePickerInput
          value={birthDate}
          onChange={(date) => {
            if (date) setBirthDate(date as any);
          }}
          size="lg"
          placeholder="Select date of birth"
          styles={{
            input: {
              backgroundColor: "#111",
              border: "2px solid #ff00aa",
              color: "#fff",
            },
          }}
        />

        <Button
          onClick={handleCalculate}
          size="lg"
          style={{ backgroundColor: "#ff00aa" }}
        >
          CALCULATE AGE
        </Button>

        {result && (
          <Paper
            style={{
              backgroundColor: "#2a0a2a",
              border: "3px solid #ff00aa",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <Stack gap="lg">
              <div>
                <Text
                  style={{
                    color: "#aaa",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  Age
                </Text>
                <Text
                  style={{
                    color: "#ff00aa",
                    fontSize: "4.5rem",
                    fontWeight: 900,
                  }}
                >
                  {result.years}
                </Text>
                <Text style={{ color: "#aaa", fontSize: "1.5rem" }}>
                  years old
                </Text>
              </div>
              <Group justify="center" gap="xl">
                <div>
                  <Text
                    style={{
                      color: "#00d4ff",
                      fontSize: "2rem",
                      fontWeight: 800,
                    }}
                  >
                    {result.months}
                  </Text>
                  <Text style={{ color: "#aaa" }}>months</Text>
                </div>
                <div>
                  <Text
                    style={{
                      color: "#00d4ff",
                      fontSize: "2rem",
                      fontWeight: 800,
                    }}
                  >
                    {result.days}
                  </Text>
                  <Text style={{ color: "#aaa" }}>days</Text>
                </div>
              </Group>
              <Text style={{ color: "#aaa", marginTop: "1rem" }}>
                Total: {result.totalDays.toLocaleString()} days
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
