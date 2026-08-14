const path = require('path');
const fs = require('fs');

const originalJoin = path.join;

path.join = function(...args) {
  const result = originalJoin.apply(path, args);
  const last = args[args.length - 1];
  if (last && typeof last === 'string' && (last.startsWith('/tmp/.tmp_') || last.startsWith('/tmp/.temp_') || last.startsWith('../.temp_'))) {
    return last;
  }

  if (result.includes('/tmp/.tmp_') && !fs.existsSync(result)) {
    const match = result.match(new RegExp('(.*)(/tmp/\\.tmp_[^/]+)(.*)'));
    if (match) {
      const fixed = match[2] + match[3];
      if (fs.existsSync(fixed)) {
        return fixed;
      }
    }
  }
  return result;
};
const originalResolve = path.resolve;
path.resolve = function(...args) {
  const result = originalResolve.apply(path, args);
  if (result.includes('/tmp/.tmp_') && !fs.existsSync(result)) {
    const match = result.match(new RegExp('(.*)(/tmp/\\.tmp_[^/]+)(.*)'));
    if (match) {
      const fixed = match[2] + match[3];
      if (fs.existsSync(fixed)) {
        console.log('[monkey-patch] 修正 resolve:', result, '->', fixed);
        return fixed;
      }
    }
  }
  return result;
};