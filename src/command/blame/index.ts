import * as assert from 'assert';
import { execSync } from 'child_process';
import { Emacs } from '../../emacs';
import { Env } from '../type';
import open = require('open');

async function blameInternal(urlFragment: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (env.filename === '') {
    throw new Error(`Not in the file buffer`);
  }
  const filename = env.directory + env.filename;
  const blameResult = execBlame(filename, env.cursor.row);
  const blame = parseBlameResult(blameResult);
  const prNumber = findMaybePrNumber(blame.summary);
  return { prNumber, blame };
}

export async function blame(urlFragment: string, env?: Env) {
  const { blame, prNumber } = await blameInternal(urlFragment, env);
  const url = prNumber
    ? `https://${urlFragment}/pull/${prNumber}`
    : `https://${urlFragment}/commit/${blame.commitHash}`;
  open(url);

  return Emacs.message(`open ${url}`);
}

blame.command = 'blame';

export async function blameCommit(urlFragment: string, env?: Env) {
  const { blame } = await blameInternal(urlFragment, env);
  const url = `https://${urlFragment}/commit/${blame.commitHash}`;
  open(url);

  return Emacs.message(`open ${url}`);
}

blameCommit.command = 'blame-commit';

function execBlame(filepath: string, lineNumber: number) {
  try {
    return execSync(`git blame -L ${lineNumber},${lineNumber} -p ${filepath}`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
  } catch (e) {
    throw new Error(e.stderr.toString());
  }
}

function parseBlameResult(blameResult: string) {
  const blameLines = blameResult.split('\n');
  const firstLine = blameLines[0];
  if (firstLine.includes('Not Committed Yet')) {
    throw new Error('Not Committed Yet');
  }
  const commitHash = firstLine.split(' ')[0];
  const summary = blameLines.find(line => line.startsWith('summary '));
  if (summary == null) {
    throw new Error(`Cannot find summary: ${blameResult}`);
  }

  return {
    summary: summary.replace(/^summary /, ''),
    commitHash,
  };
}

function findMaybePrNumber(summary: string) {
  const match = summary.match(/#(\d+)/);
  if (match == null) {
    return null;
  }
  return match[1];
}
