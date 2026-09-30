import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

const dir = process.cwd();

async function main() {
  console.log('📦 Initializing Git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  console.log('🔍 Staging files...');
  // Find all files respecting gitignore
  const statusMatrix = await git.statusMatrix({ fs, dir });
  
  for (const [filepath, head, workdir, stage] of statusMatrix) {
    if (workdir !== 0) {
      await git.add({ fs, dir, filepath });
    } else if (head === 1 && workdir === 0) {
      await git.remove({ fs, dir, filepath });
    }
  }

  console.log('📝 Creating commit...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Industrial Approval Portal Developer',
      email: 'developer@portal.gov.in'
    },
    message: 'Initial commit: Industrial Approval Portal (Single Window Clearance System) with enterprise UI redesign and full backend APIs'
  });
  console.log('✅ Committed:', sha);

  console.log('🔗 Adding remote origin: https://github.com/naveenn2823-prog/SIH.git');
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/naveenn2823-prog/SIH.git',
      force: true
    });
  } catch (e) {
    console.log('Remote already exists or updated:', e.message);
  }

  console.log('🚀 Attempting to push to remote main branch...');
  const token = process.argv[2] || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  
  if (!token) {
    console.log('\n⚠️  A GitHub Personal Access Token is required to push to https://github.com/naveenn2823-prog/SIH.git');
    console.log('Run: node push-to-github.mjs <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>\n');
    return;
  }

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => {
        return { username: token };
      }
    });
    console.log('🎉 Pushed to GitHub successfully! Result:', pushResult);
  } catch (err) {
    console.error('❌ Push error:', err.message);
    if (err.data) console.error('Details:', err.data);
  }
}

main().catch(console.error);
