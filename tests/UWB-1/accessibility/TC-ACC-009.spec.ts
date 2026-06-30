import { test, expect } from '@playwright/test';

const APP_URL = 'https://united-educators-application.vercel.app';

/** Relative luminance of an sRGB color per WCAG 2.x */
function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG contrast ratio between two colors expressed as [r,g,b] */
function contrastRatio(fg: [number, number, number], bg: [number, number, number]): number {
  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Parse "rgb(r, g, b)" or "rgba(r, g, b, a)" strings to [r, g, b] */
function parseRgb(cssColor: string): [number, number, number] | null {
  const match = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

test.describe('Accessibility — UWB-1: New Submission Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'New Submission', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-ACC-009: Color contrast meets WCAG 2.1 AA minimum ratio', async ({ page }) => {

    // Collect computed color/background-color pairs for key element categories
    type ContrastResult = {
      selector: string;
      text: string;
      color: string;
      backgroundColor: string;
      ratio: number | null;
      passes: boolean;
      threshold: number;
    };

    const results: ContrastResult[] = await page.evaluate(() => {
      const NORMAL_TEXT_THRESHOLD = 4.5;
      const LARGE_TEXT_THRESHOLD = 3.0;

      function relativeLuminance(r: number, g: number, b: number): number {
        const toLinear = (c: number) => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
      }

      function contrastRatio(fg: [number, number, number], bg: [number, number, number]): number {
        const l1 = relativeLuminance(...fg);
        const l2 = relativeLuminance(...bg);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
      }

      function parseRgb(cssColor: string): [number, number, number] | null {
        const match = cssColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return null;
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }

      function getEffectiveBackground(el: Element): string {
        let current: Element | null = el;
        while (current) {
          const bg = getComputedStyle(current).backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
          current = current.parentElement;
        }
        return 'rgb(255, 255, 255)';
      }

      const selectors = [
        // Form labels
        { selector: 'label', category: 'label', isLarge: false },
        // Input placeholder text (checked via ::placeholder — approximated via color)
        { selector: 'input', category: 'input', isLarge: false },
        // Buttons
        { selector: 'button', category: 'button', isLarge: false },
        // Error messages
        { selector: '[class*="error"], [role="alert"]', category: 'error', isLarge: false },
      ];

      const output: ContrastResult[] = [];

      for (const { selector, category, isLarge } of selectors) {
        const elements = Array.from(document.querySelectorAll(selector)).slice(0, 5);
        for (const el of elements) {
          const style = getComputedStyle(el as Element);
          const color = style.color;
          const backgroundColor = getEffectiveBackground(el);
          const threshold = isLarge ? LARGE_TEXT_THRESHOLD : NORMAL_TEXT_THRESHOLD;

          const fgRgb = parseRgb(color);
          const bgRgb = parseRgb(backgroundColor);
          const ratio = fgRgb && bgRgb ? contrastRatio(fgRgb, bgRgb) : null;

          output.push({
            selector: `${category} — ${(el as HTMLElement).textContent?.trim().substring(0, 40) ?? '(no text)'}`,
            text: (el as HTMLElement).textContent?.trim().substring(0, 40) ?? '',
            color,
            backgroundColor,
            ratio: ratio !== null ? parseFloat(ratio.toFixed(2)) : null,
            passes: ratio !== null ? ratio >= threshold : false,
            threshold,
          });
        }
      }

      return output;
    });

    // Log all contrast results for the HTML report
    console.table(results);

    // Filter results where the ratio was computable (non-transparent backgrounds)
    const measurableResults = results.filter((r) => r.ratio !== null);

    expect(
      measurableResults.length,
      'No elements with measurable color contrast were found on the page'
    ).toBeGreaterThan(0);

    // Collect all failures
    const failures = measurableResults.filter((r) => !r.passes);

    if (failures.length > 0) {
      const failureReport = failures
        .map(
          (f) =>
            `"${f.selector}" — ratio: ${f.ratio} (required ≥ ${f.threshold}) | FG: ${f.color} | BG: ${f.backgroundColor}`
        )
        .join('\n');
      console.warn('CONTRAST FAILURES:\n' + failureReport);
    }

    // Assert no WCAG AA contrast failures
    expect(
      failures,
      `${failures.length} element(s) failed WCAG 2.1 AA contrast ratio:\n` +
        failures
          .map((f) => `  • ${f.selector}: ${f.ratio}:1 (required ≥ ${f.threshold}:1)`)
          .join('\n')
    ).toHaveLength(0);
  });
});
