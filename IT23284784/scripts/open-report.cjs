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
    // Open a local HTML file in the default browser.
    // Paths here may contain '&', so we avoid PowerShell and ensure quoting.
    const attempts = [
      () => execFileSync('rundll32.exe', ['url.dll,FileProtocolHandler', reportIndex], { stdio: 'ignore', windowsHide: true }),
      () => execFileSync('cmd', ['/c', `start "" "${reportIndex}"`], { stdio: 'ignore', windowsHide: true }),
      () => execFileSync('explorer.exe', [reportIndex], { stdio: 'ignore', windowsHide: true }),
    ];

    for (const attempt of attempts) {
      try {
        attempt();
        process.exitCode = 0;
        return;
      } catch {
        // try next opener
      }
    }

    console.error('Failed to open the Playwright report automatically.');
    process.exitCode = 1;
    return;
  }

  // Best-effort for other platforms.
  const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
  execFileSync(opener, [reportIndex], { stdio: 'ignore' });
}

main();
