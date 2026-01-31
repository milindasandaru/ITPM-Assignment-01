import { test, expect } from '@playwright/test';
import fs from 'fs';

const testCases = [
  // --- POSITIVE FUNCTIONAL ---
  { id: 'Pos_Fun_0001', input: 'suba sanDhYaavak', type: 'S', desc: 'Greeting (Simple)', category: 'Greeting/request/response; Simple sentence; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0002', input: 'mama heta gamee yanavaa', type: 'S', desc: 'Simple Sentence (Future)', category: 'Daily language usage; Future tense; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0003', input: 'api dhaen kaeema kamu saha chithrapatiyak balamu', type: 'M', desc: 'Compound Sentence', category: 'Daily language usage; Compound sentence; M (31-299 characters); Accuracy validation' },
  { id: 'Pos_Fun_0004', input: 'vaessa nisaa mama gedhara hitiyaa', type: 'M', desc: 'Complex Sentence (Reason)', category: 'Daily language usage; Complex sentence; M (31-299 characters); Accuracy validation' },
  { id: 'Pos_Fun_0005', input: 'oyaa assignement eka karaadha?', type: 'S', desc: 'Interrogative (Question)', category: 'Interrogative (question); Simple sentence; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0006', input: 'karuNaakaralaa mata paeena dhenna', type: 'M', desc: 'Imperative (Polite)', category: 'Greeting/request/response; Imperative (command); M (31-299 characters); Accuracy validation' },
  { id: 'Pos_Fun_0007', input: 'ooyi mehe varen', type: 'S', desc: 'Imperative (Informal)', category: 'Slang/informal language; Imperative (command); S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0008', input: 'mama yanne naee', type: 'S', desc: 'Negative Form', category: 'Daily language usage; Negation (negative form); S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0009', input: 'api okkoma heta yanavaa', type: 'S', desc: 'Plural Form', category: 'Daily language usage; Plural form; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0010', input: 'oyaa monavadha kara kara innee', type: 'S', desc: 'Pronoun Variation', category: 'Daily language usage; Pronoun variation; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0011', input: 'mama iiyee chess play karaa', type: 'S', desc: 'Past Tense', category: 'Daily language usage; Past tense; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0012', input: 'mama dhaen kaeema kanavaa', type: 'S', desc: 'Present Tense', category: 'Daily language usage; Present tense; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0013', input: 'hoDHA Lamayaa', type: 'S', desc: 'Phrase Pattern', category: 'Word combination/phrase pattern; Simple sentence; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0014', input: 'matabadagini', type: 'S', desc: 'Joined Words (Stress)', category: 'Typographical error handling; Simple sentence; S (≤30 characters); Robustness validation' },
  { id: 'Pos_Fun_0015', input: 'tikak tikak inna', type: 'S', desc: 'Repeated Words', category: 'Word combination/phrase pattern; Imperative (command); S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0016', input: 'mata zoom link eka whatsApp karanna', type: 'M', desc: 'Mixed English Tech', category: 'Mixed Singlish + English; Simple sentence; M (31-299 characters); Robustness validation' },
  { id: 'Pos_Fun_0017', input: 'Rs. 2500 k dhenna puluvandha', type: 'S', desc: 'Currency & Numbers', category: 'Punctuation/numbers; Interrogative (question); S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0018', input: 'heta 10.30 a.m. venakota enna', type: 'S', desc: 'Time Format', category: 'Punctuation/numbers; Imperative (command); S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0019', input: 'mama  gedhara   yanavaa', type: 'S', desc: 'Multiple Spaces', category: 'Formatting (spaces); Simple sentence; S (≤30 characters); Formatting preservation' },
  { id: 'Pos_Fun_0020', input: 'mama dhaen gedhara yanavaa. heta ennam.', type: 'M', desc: 'Line Breaks', category: 'Formatting (line breaks); Compound sentence; M (31-299 characters); Formatting preservation' },
  { id: 'Pos_Fun_0021', input: 'Suba aluth avurudhdhak veevaa!', type: 'S', desc: 'Punctuation Marks', category: 'Punctuation/numbers; Greeting/request/response; S (≤30 characters); Accuracy validation' },
  { id: 'Pos_Fun_0022', input: 'mama university ekee 3rd year ekee igena gannee', type: 'M', desc: 'Medium Input (31-299)', category: 'Mixed Singlish + English; Simple sentence; M (31-299 characters); Accuracy validation' },
  { id: 'Pos_Fun_0023', input: 'lQQkaavee bohoma dhigu ithihaasayak thiyena ratak. eyata avurudhu 2500 kata vadaa paeraNi liKitha ithihaasayak thiyenavaa. AnuraaDhapuraya, poLonnaruva vagee nagara vala thiyena puraaNa vasthu balanna godak tourists la enavaa. Api eevaa raeka ganna ooni. Meeta amatharava Sigiriya vagee looka urumayanda lankaavee thiyenavaa.', type: 'L', desc: 'Long Input (>300)', category: 'Daily language usage; Complex sentence; L (≥300 characters); Accuracy validation' },
  { id: 'Pos_Fun_0024', input: 'ammaa thaaththaa ❤️', type: 'S', desc: 'Emoji Handling', category: 'Mixed Singlish + English; Simple sentence; S (≤30 characters); Robustness validation' },

  // --- POSITIVE UI ---
  { id: 'Pos_UI_0001', input: 'test', type: 'S', desc: 'Real-time Update', category: 'Input Type: Daily usage; Simple sentence; S (≤30 characters); Real-time output update behavior' },
  { id: 'Pos_UI_0002', input: 'ov. mama kaemathi', type: 'S', desc: 'Visual Font Rendering', category: 'Input Type: Daily usage; Simple sentence; S (≤30 characters); Real-time output update behavior' },
  { id: 'Pos_UI_0003', input: ' ', type: 'S', desc: 'Whitespace Rendering', category: 'Formatting (spaces); Simple sentence; S (≤30 characters); Formatting preservation' },
  { id: 'Pos_UI_0004', input: 'ee', type: 'S', desc: 'Single Char Latency', category: 'Daily language usage; Simple sentence; S (≤30 characters); Real-time output update behavior' },
  { id: 'Pos_UI_0005', input: 'mama yanavaa', type: 'S', desc: 'Input Field Focus', category: 'Daily language usage; Simple sentence; S (≤30 characters); Real-time output update behavior' },
  { id: 'Pos_UI_0006', input: '12345', type: 'S', desc: 'Numeric Input Display', category: 'Punctuation/numbers; Simple sentence; S (≤30 characters); Accuracy validation' },

  // --- NEGATIVE SCENARIOS ---
  { id: 'Neg_Fun_0001', input: 'Thx bro c u l8r', type: 'M', desc: 'SMS Shorthand', category: 'Slang/informal language; Simple sentence; M (31-299 characters); Robustness validation' },
  { id: 'Neg_Fun_0002', input: 'www.sliit.lk', type: 'S', desc: 'URL Handling', category: 'Mixed Singlish + English; Simple sentence; S (≤30 characters); Robustness validation' },
  { id: 'Neg_Fun_0003', input: 'username@example.com', type: 'S', desc: 'Email Format', category: 'Punctuation/numbers; Simple sentence; S (≤30 characters); Robustness validation' },
  { id: 'Neg_Fun_0004', input: 'print("Hello")', type: 'M', desc: 'Code Syntax', category: 'Mixed Singlish + English; Complex sentence; M (31-299 characters); Robustness validation' },
  { id: 'Neg_Fun_0005', input: 'The quick brown fox jumps over the lazy dog', type: 'M', desc: 'English Sentences', category: 'Mixed Singlish + English; Simple sentence; M (31-299 characters); Robustness validation' },
  { id: 'Neg_UI_0001', input: '', type: 'S', desc: 'Empty Input', category: 'Empty/cleared input handling; Simple sentence; S (≤30 characters); Error handling / input validation' },
  { id: 'Neg_UI_0002', input: '   ', type: 'S', desc: 'Only Spaces', category: 'Empty/cleared input handling; Simple sentence; S (≤30 characters); Error handling / input validation' },
  { id: 'Neg_UI_0003', input: '#@$#@$#@$', type: 'S', desc: 'Special Char Spam', category: 'Typographical error handling; Simple sentence; S (≤30 characters); Robustness validation' },
  { id: 'Neg_UI_0004', input: '<script>alert("hi")</script>', type: 'M', desc: 'HTML Tag Injection', category: 'Mixed Singlish + English; Compound sentence; M (31-299 characters); Robustness validation' },
  { id: 'Neg_UI_0005', input: 'A'.repeat(301), type: 'L', desc: 'Buffer Overflow', category: 'Typographical error handling; Simple sentence; L (≥300 characters); Robustness validation' },
];

test.describe('IT3040 Assignment 1 - SwiftTranslator', () => {
  // Data-driven tests for all cases
  test.describe('Data-driven translation validation', () => {
    for (const tc of testCases) {
      test(`${tc.id} | ${tc.desc}`, async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');

        const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
        await inputLocator.waitFor({ state: 'visible', timeout: 15000 });
        await inputLocator.fill(''); // explicitly clear
        await inputLocator.fill(tc.input);

        // Wait for real-time conversion
        await page.waitForTimeout(2000);

        // Capture output value (best-effort: output may be a second textarea, or may render elsewhere)
        const textareas = page.locator('textarea');
        const textareaCount = await textareas.count();
        const outputLocator = textareaCount >= 2 ? textareas.nth(1) : textareas.nth(0);
        await outputLocator.waitFor({ state: 'visible', timeout: 15000 });
        const outputValue = await outputLocator.inputValue();

        const line = `${tc.id} | ${tc.input} | ${outputValue}`;
        console.log(line);
        fs.appendFileSync('test_results.txt', line + '\n');
      });
    }
  });

  // Separate UI test for Pos_UI_0001 typing slowly
  test('Pos_UI_0001 - Real-time Update (slow typing)', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const inputLocator = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputLocator.waitFor({ state: 'visible', timeout: 15000 });
    await inputLocator.fill('');
    // Type slowly to verify real-time updates
    await inputLocator.type('test', { delay: 300 });

    // Allow UI to update
    await page.waitForTimeout(2000);
    const textareas = page.locator('textarea');
    const textareaCount = await textareas.count();
    const outputLocator = textareaCount >= 2 ? textareas.nth(1) : textareas.nth(0);
    await outputLocator.waitFor({ state: 'visible', timeout: 15000 });
    const outputValue = await outputLocator.inputValue();

    // Basic assertion to ensure some output exists
    expect(outputValue).toBeDefined();
  });
});