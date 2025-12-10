import { promises as fs } from 'fs';
import path from 'path';
import { Plugin } from 'vite';

export function writeVersion(
  outputDir: string,
  buildVersion: string,
  appVersion: string
): Plugin {
  return {
    name: 'write-version',
    apply: 'build',

    transformIndexHtml(html) {
      return html.replace(/{{appVersion}}/g, buildVersion);
    },

    async closeBundle() {
      try {
        const filePath = path.join(outputDir, 'version.json');

        // Ensure directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Build version data
        const data = JSON.stringify(
          { version: appVersion, buildVersion },
          null,
          2
        );

        await fs.writeFile(filePath, data);

        console.log(`✔ version.json generated at ${filePath}`);
      } catch (err) {
        console.error('⚠ Failed to write version file:', err);
      }
    },
  };
}
