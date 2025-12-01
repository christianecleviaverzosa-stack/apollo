import { writeFileSync } from 'fs';
import path from 'path';
import { Plugin } from 'vite';

export function writeVersion(
  buildPath: string,
  buildVersion: string,
  version: string
): Plugin {
  return {
    apply: 'build',
    name: 'write-version',
    transformIndexHtml(html) {
      return html.replace(new RegExp(`{{appVersion}}`, 'g'), buildVersion);
    },
    closeBundle() {
      const versionFile = path.join(buildPath, 'version.json');
      const data = `{"version":"${version}"}`;

      try {
        writeFileSync(versionFile, data);
        console.log(`Generated ${versionFile} (${version}) successfully!`);
      } catch (error) {
        console.error(`Error writing ${buildPath}: ${error}`);
      }
    },
  };
}
