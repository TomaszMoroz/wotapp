#!/usr/bin/env python3
"""Upload lokalnego katalogu na FTP (smallhost). Uzywany przez deploy-pwa.sh."""
import ftplib
import os
import sys

host = os.environ['FTP_HOST']
user = os.environ['FTP_USER']
password = os.environ['FTP_PASS']
local_dir = sys.argv[1]
remote_dir = os.environ['FTP_REMOTE_DIR'].rstrip('/')

ftp = ftplib.FTP(host, timeout=60)
ftp.login(user, password)
ftp.set_pasv(True)


def ensure_dir(path):
    parts = [p for p in path.split('/') if p]
    ftp.cwd('/')
    for part in parts:
        try:
            ftp.mkd(part)
        except ftplib.error_perm:
            pass
        ftp.cwd(part)


uploaded = failed = 0
for root, _dirs, files in os.walk(local_dir):
    rel = os.path.relpath(root, local_dir)
    target = remote_dir if rel == '.' else remote_dir + '/' + rel.replace(os.sep, '/')
    ensure_dir(target)
    ftp.cwd(target)
    for name in files:
        if name == '.DS_Store':
            continue
        try:
            with open(os.path.join(root, name), 'rb') as fh:
                ftp.storbinary('STOR ' + name, fh, blocksize=65536)
            uploaded += 1
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f'FAIL {name}: {exc}', flush=True)
    print(f'DIR {target} done', flush=True)

print(f'UPLOADED={uploaded} FAILED={failed}', flush=True)
ftp.quit()
sys.exit(1 if failed else 0)
