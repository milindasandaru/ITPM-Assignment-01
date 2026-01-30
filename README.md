# IT3040 Assignment 1 - Automation Test Suite

This repository contains a Playwright (TypeScript) automation test suite for the university assignment "IT3040_Assignment1".

## Student Details
- Name: SENARATH S.A.M.S
- ID: IT23284784

**Description**
- Automates Singlish-to-Sinhala translation testing for https://www.swifttranslator.com/.

**Folder Structure**
- ITPM-Assignment-01/
	- IT23284784/
		- package.json
		- playwright.config.ts
		- tests/
			- assignment1.spec.ts
		- test_results.txt (generated after test run)

**Prerequisites**
- Node.js LTS installed
- Internet access (tests visit https://www.swifttranslator.com/)

**Install Dependencies**
- From the project folder:

```bash
cd IT23284784
npm install
```

**Run the Tests**
- Execute the full suite:

```bash
npx playwright test
```

**Optional: View Report**

```bash
npx playwright show-report
```

**Notes**
- Results are appended to `test_results.txt` in the format: `ID | Input | Actual Output`.
- Includes a UI test (`Pos_UI_0001`) that types slowly to verify real-time updates.

{Pos_Fun_0005

oyaa assignement eka karaadha?

ඔයා අස්සිග්නෙමෙන්ට් එක කරාද?}

it shows assignment translated to sinhala