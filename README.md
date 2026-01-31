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
npm run test
```

This will run the suite and (if all tests pass) open the HTML report automatically.

**Run Tests Without Opening Report (CI-safe)**

```bash
npm run test:ci
```

**View Report (Manually)**

```bash
npm run show-report
```

**Clean Generated Artifacts (Optional)**

```bash
npm run clean
```

**Notes**
- Generated artifacts like Playwright reports and test results are ignored by git.
- Includes a UI test (`Pos_UI_0001`) that types slowly to verify real-time updates.

**Windows Path Note**
- If your folder path contains `&` (like `Labs_&_Tutorials`), avoid running `npx playwright ...` directly.
	Use the provided `npm run ...` scripts instead.