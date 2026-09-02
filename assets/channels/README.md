# Channel artwork

Drop the five exports from Figma in here. No code change is needed: each asset
looks for `assets/channels/<key>.png` first, and falls back to the built
artwork if the file is missing.

| File            | Figma node   | Node size |
| --------------- | ------------ | --------- |
| `whatsapp.png`  | `12360:9279` | 339 x 406 |
| `imessage.png`  | `12360:9248` | 339 x 406 |
| `gmail.png`     | `12360:9278` | 766 x 628 |
| `teams.png`     | `12360:9321` | 387 x 408 |
| `slack.png`     | `12360:9320` | 384 x 386 |

Export as PNG at 2x so the artwork stays sharp on high density screens. Keep
the transparency; the section sits on a near black background and the assets
overlap each other.

These could not be fetched automatically. This environment blocks `figma.com`,
and the only other route caps at 20KB per transfer, which is not reliable
enough for binary data.
