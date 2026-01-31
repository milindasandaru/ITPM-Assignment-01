const fs = require('fs');
const path = require('path');

function removePath(targetPath) {
  if (!fs.existsSync(targetPath)) return;

  const stat = fs.lstatSync(targetPath);
  if (stat.isDirectory()) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  } else {
    fs.rmSync(targetPath, { force: true });
  }
}

function main() {
  const projectRoot = process.cwd();

  const targets = [
    path.join(projectRoot, 'playwright-report'),
    path.join(projectRoot, 'test-results'),
    path.join(projectRoot, 'test_results.txt'),
  ];

  for (const target of targets) removePath(target);

  // Also clean root-level Playwright artifacts if user ran from repo root.
  const repoRootGuess = path.resolve(projectRoot, '..');
  const rootTestResults = path.join(repoRootGuess, 'test-results');
  if (fs.existsSync(rootTestResults)) removePath(rootTestResults);

  console.log('Cleaned Playwright artifacts.');
}

main();
