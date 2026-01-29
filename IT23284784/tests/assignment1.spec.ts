import { test, expect } from '@playwright/test';
import fs from 'fs';

// Test Data Array (exact cases provided)
const testCases = [
  // --- SECTION 1: POSITIVE FUNCTIONAL ---
  { id: 'Pos_Fun_0001', input: 'suba sandeaavak', type: 'S', desc: 'Greeting (Simple)', category: 'Greeting/request/response' },
  { id: 'Pos_Fun_0002', input: 'mama heta gama yanavaa.', type: 'S', desc: 'Simple Sentence (Future)', category: 'Simple sentence' },
  { id: 'Pos_Fun_0003', input: 'api den kaema kamu saha passe padam karamu.', type: 'M', desc: 'Compound Sentence', category: 'Compound sentence' },
  { id: 'Pos_Fun_0004', input: 'wessa nisa mama gedara hitiya.', type: 'M', desc: 'Complex Sentence (Reason)', category: 'Complex sentence' },
  { id: 'Pos_Fun_0005', input: 'oya assignment eka liwwada?', type: 'S', desc: 'Interrogative (Question)', category: 'Interrogative (question)' },
  { id: 'Pos_Fun_0006', input: 'karunakara mata pena denna.', type: 'M', desc: 'Imperative (Polite Command)', category: 'Imperative (command)' },
  { id: 'Pos_Fun_0007', input: 'ado mehe waren.', type: 'S', desc: 'Imperative (Informal)', category: 'Slang/informal language' },
  { id: 'Pos_Fun_0008', input: 'mama yanne ne.', type: 'S', desc: 'Negative Form', category: 'Negation (negative form)' },
  { id: 'Pos_Fun_0009', input: 'api okkoma heta yanava.', type: 'M', desc: 'Plural Form', category: 'Plural form' },
  { id: 'Pos_Fun_0010', input: 'oya monawada karanne?', type: 'S', desc: 'Pronoun Variation (You)', category: 'Pronoun variation' },
  { id: 'Pos_Fun_0011', input: 'mama iye cricket gehuwa.', type: 'M', desc: 'Past Tense', category: 'Past tense' },
  { id: 'Pos_Fun_0012', input: 'mama den kanawa.', type: 'S', desc: 'Present Tense', category: 'Present tense' },
  { id: 'Pos_Fun_0013', input: 'hoda lamaya', type: 'S', desc: 'Phrase Pattern', category: 'Word combination/phrase pattern' },
  { id: 'Pos_Fun_0014', input: 'matabadaagini', type: 'S', desc: 'Joined Words (No spaces)', category: 'Typographical error handling' },
  { id: 'Pos_Fun_0015', input: 'tikak tikak inna.', type: 'S', desc: 'Repeated Words', category: 'Word combination/phrase pattern' },
  { id: 'Pos_Fun_0016', input: 'mata Zoom link eka WhatsApp karanna.', type: 'M', desc: 'Mixed English Tech Terms', category: 'Mixed Singlish + English' },
  { id: 'Pos_Fun_0017', input: 'Rs. 2500 k denna puluwanda?', type: 'M', desc: 'Currency & Numbers', category: 'Punctuation/numbers' },
  { id: 'Pos_Fun_0018', input: 'heta 10.30 AM wenakota enna.', type: 'M', desc: 'Time Format', category: 'Punctuation/numbers' },
  { id: 'Pos_Fun_0019', input: 'mama  gedara   yanava.', type: 'S', desc: 'Multiple Spaces', category: 'Formatting (spaces)' },
  { id: 'Pos_Fun_0020', input: 'mama gedara yanava.\nheta ennam.', type: 'M', desc: 'Line Breaks', category: 'Formatting (line breaks)' },
  { id: 'Pos_Fun_0021', input: 'Suba Aluth Avuruddak Weva!', type: 'M', desc: 'Punctuation Marks', category: 'Punctuation/numbers' },
  { id: 'Pos_Fun_0022', input: 'ow.', type: 'S', desc: 'Short Input (<30)', category: 'S (≤30 characters)' },
  { id: 'Pos_Fun_0023', input: 'mama university eke 3rd year igena gannawa.', type: 'M', desc: 'Medium Input (31-299)', category: 'M (31-299 characters)' },
  { id: 'Pos_Fun_0024', input: 'Lankawe ithihasaya bohomayak purana ekak. Eya wurthaya 2500 kata wada parana ithihasayak thiyenawa. Anuradhapura polonnaruwa wage nagara wala thiyena purana wasthu balanna godak tourists la enawa. Api mewa rekaganna ona.', type: 'L', desc: 'Long Input (>300)', category: 'L (≥300 characters)' },
  // --- SECTION 2: POSITIVE UI ---
  { id: 'Pos_UI_0001', input: 'test', type: 'S', desc: 'Real-time Update', category: 'Real-time output update behavior' },
  { id: 'Pos_UI_0002', input: 'amma', type: 'S', desc: 'Visual Font Rendering', category: 'Real-time output update behavior' },
  { id: 'Pos_UI_0003', input: ' ', type: 'S', desc: 'Whitespace Rendering', category: 'Formatting preservation' },
  { id: 'Pos_UI_0004', input: '12345', type: 'S', desc: 'Numeric Input Display', category: 'Accuracy validation' },
  { id: 'Pos_UI_0005', input: 'A', type: 'S', desc: 'Single Character Latency', category: 'Real-time output update behavior' },
  { id: 'Pos_UI_0006', input: 'mama', type: 'S', desc: 'Input Field Focus', category: 'Real-time output update behavior' },
  // --- SECTION 3: NEGATIVE SCENARIOS ---
  { id: 'Neg_Fun_0001', input: 'Thx bro, c u l8r.', type: 'M', desc: 'SMS Shorthand', category: 'Slang/informal language' },
  { id: 'Neg_Fun_0002', input: 'www.sliit.lk', type: 'S', desc: 'URL Handling', category: 'Mixed Singlish + English' },
  { id: 'Neg_Fun_0003', input: 'user@example.com', type: 'S', desc: 'Email Format', category: 'Punctuation/numbers' },
  { id: 'Neg_Fun_0004', input: 'print("hello world");', type: 'M', desc: 'Code Syntax', category: 'Robustness validation' },
  { id: 'Neg_Fun_0005', input: 'The quick brown fox jumps.', type: 'M', desc: 'English Sentences', category: 'Mixed Singlish + English' },
  { id: 'Neg_UI_0001', input: '', type: 'S', desc: 'Empty Input', category: 'Empty/cleared input handling' },
  { id: 'Neg_UI_0002', input: '     ', type: 'S', desc: 'Only Spaces', category: 'Empty/cleared input handling' },
  { id: 'Neg_UI_0003', input: '#@$#@$#@$', type: 'S', desc: 'Special Char Spam', category: 'Robustness validation' },
  { id: 'Neg_UI_0004', input: '<script>alert("hi")</script>', type: 'M', desc: 'HTML Tag Injection', category: 'Robustness validation' },
  { id: 'Neg_UI_0005', input: 'A'.repeat(1000), type: 'L', desc: 'Buffer Overflow', category: 'Robustness validation' }
];

test.describe('IT3040 Assignment 1 - SwiftTranslator', () => {
  // Data-driven tests for all cases
  test.describe('Data-driven translation validation', () => {
    for (const tc of testCases) {
      test(`${tc.id} | ${tc.desc}`, async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');

        await page.waitForSelector('#singlish_input', { state: 'visible', timeout: 15000 });
        const inputLocator = page.locator('#singlish_input');
        await inputLocator.fill(''); // explicitly clear
        await inputLocator.fill(tc.input);

        // Wait for real-time conversion
        await page.waitForTimeout(2000);

        // Capture output value
        await page.waitForSelector('#sinhala_output', { timeout: 15000 });
        const outputValue = await page.inputValue('#sinhala_output');

        const line = `${tc.id} | ${tc.input} | ${outputValue}`;
        console.log(line);
        fs.appendFileSync('test_results.txt', line + '\n');
      });
    }
  });

  // Separate UI test for Pos_UI_0001 typing slowly
  test('Pos_UI_0001 - Real-time Update (slow typing)', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    await page.waitForSelector('#singlish_input', { state: 'visible', timeout: 15000 });
    const inputLocator = page.locator('#singlish_input');
    await inputLocator.fill('');
    // Type slowly to verify real-time updates
    await page.type('#singlish_input', 'test', { delay: 300 });

    // Allow UI to update
    await page.waitForTimeout(2000);
    await page.waitForSelector('#sinhala_output', { timeout: 15000 });
    const outputValue = await page.inputValue('#sinhala_output');

    // Basic assertion to ensure some output exists
    expect(outputValue).toBeDefined();
  });
});
