#!/bin/bash
# Mac Mirror installer: curl -fsSL https://macmirror.me/install.sh | bash
# Downloads the latest release, copies it to Applications and opens it.
set -euo pipefail

URL="https://github.com/kartikeyasharma10-arch/macmirror-site/releases/latest/download/MacMirror.dmg"
APP="Mac Mirror.app"

echo "🪞 Installing Mac Mirror…"
if [[ "$(sw_vers -productVersion | cut -d. -f1)" -lt 14 ]]; then
  echo "Mac Mirror needs macOS 14 Sonoma or newer." >&2; exit 1
fi

TMP="$(mktemp -d)"
MNT="$TMP/mnt"
cleanup() { hdiutil detach "$MNT" -quiet 2>/dev/null || true; rm -rf "$TMP"; }
trap cleanup EXIT

curl -fsSL "$URL" -o "$TMP/MacMirror.dmg"
hdiutil attach -nobrowse -readonly -quiet -mountpoint "$MNT" "$TMP/MacMirror.dmg"

DEST="/Applications"
[[ -w "$DEST" ]] || { DEST="$HOME/Applications"; mkdir -p "$DEST"; }

pkill -x MacMirror 2>/dev/null || true
rm -rf "$DEST/$APP"
ditto "$MNT/$APP" "$DEST/$APP"
xattr -dr com.apple.quarantine "$DEST/$APP" 2>/dev/null || true

sleep 1; open "$DEST/$APP" 2>/dev/null || { sleep 2; open "$DEST/$APP"; }
echo "✓ Mac Mirror is installed in $DEST and running. Look for the mirror on the right edge of your screen."
