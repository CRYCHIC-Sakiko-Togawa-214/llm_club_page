import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, 'dist')
const branch = 'gh-pages'

function git(args, options = {}) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
    timeout: 60_000,
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

if (
  !existsSync(join(output, 'index.html')) ||
  !existsSync(join(output, '.nojekyll'))
) {
  throw new Error('Build the site first with npm run build.')
}

// Fetch the existing deployment parent so updates are always fast-forward.
let parent = ''
try {
  git(['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`])
  git(['fetch', '--no-tags', 'origin', `refs/heads/${branch}`])
  parent = git(['rev-parse', 'FETCH_HEAD'])
} catch (error) {
  if (error.status !== 2) throw error
}

const gitDirectory = git(['rev-parse', '--absolute-git-dir'])
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'lzu-pages-index-'))
const indexPath = join(temporaryDirectory, 'index')
const snapshotOptions = {
  cwd: output,
  env: { ...process.env, GIT_INDEX_FILE: indexPath },
}
const snapshotArgs = ['--git-dir', gitDirectory, '--work-tree', output]

try {
  // A separate index preserves both the checked-out branch and staged changes.
  git([...snapshotArgs, 'read-tree', '--empty'], snapshotOptions)
  git([...snapshotArgs, 'add', '--all', '--', '.'], snapshotOptions)
  const tree = git([...snapshotArgs, 'write-tree'], snapshotOptions)
  if (parent && git(['rev-parse', `${parent}^{tree}`]) === tree) {
    console.log('The published branch already contains this build.')
  } else {
    const commit = git([
      'commit-tree',
      tree,
      ...(parent ? ['-p', parent] : []),
      '-m',
      'deploy: publish LZU LLM club website',
    ])
    // No force push: concurrent deployment changes cause a safe rejection.
    git(['push', 'origin', `${commit}:refs/heads/${branch}`])
    console.log(`Published ${commit} to ${branch}.`)
  }
} finally {
  // Only remove the exact temporary files created by this invocation.
  rmSync(indexPath, { force: true })
  rmSync(`${indexPath}.lock`, { force: true })
  rmdirSync(temporaryDirectory)
}
