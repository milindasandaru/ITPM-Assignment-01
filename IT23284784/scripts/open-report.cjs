const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function main() {
  const reportIndex = path.resolve(process.cwd(), 'playwright-report', 'index.html');

  if (!fs.existsSync(reportIndex)) {
    console.error('Playwright report not found. Run tests first to generate it.');
    console.error(`Expected: ${reportIndex}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Opening report: ${reportIndex}`);

  if (process.platform === 'win32') {
    // Use cmd.exe to avoid PowerShell issues with '&' in paths.
    execFileSync('cmd', ['/c', 'start', '', reportIndex], { stdio: 'ignore' });
    return;
  }

  // Best-effort for other platforms.
  const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
  execFileSync(opener, [reportIndex], { stdio: 'ignore' });
}

main();
