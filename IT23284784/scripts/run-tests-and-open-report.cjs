const { spawnSync } = require('child_process');

function run(cmd, args) {
  return spawnSync(cmd, args, { stdio: 'inherit', shell: false });
}

function main() {
  // Run the real Playwright test command.
  const test = run(process.execPath, ['./node_modules/@playwright/test/cli.js', 'test']);
  if (test.status !== 0) {
    process.exitCode = test.status ?? 1;
    return;
  }

  // Only open the report if tests passed.
  const open = run(process.execPath, ['./scripts/open-report.cjs']);
  process.exitCode = open.status ?? 0;
}

main();
