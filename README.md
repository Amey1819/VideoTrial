# The Boy With Torn Shoes — Remotion starter

A vertical 60-second animated story starter (1080x1920, 30fps) with timed captions, scene transitions, a voiceover-generation script, and a replaceable music track.

## Important production note

This starter uses stylized 2D/2.5D vector characters and environments built in React/CSS. Remotion is a programmatic video framework; it does **not** generate Pixar-quality 3D character animation or AI voice by itself. The voiceover script uses ElevenLabs and requires your API key. For cinematic 3D visuals, generate or license consistent character/scene assets separately and replace the vector scenes. No voiceover or music file is included yet.

## Install

```bash
npm install
npx skills add remotion-dev/skills
```

If you already created a Remotion project, the Remotion-native command is:

```bash
npx remotion skills add
```

Official skills repository: https://github.com/remotion-dev/skills

## Generate voiceover

1. Copy `.env.example` to `.env` and add your ElevenLabs API key.
2. Load the environment variables in your shell (or use `dotenv` if you add it).
3. Run:

```powershell
$env:ELEVENLABS_API_KEY="YOUR_KEY"
$env:ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
node scripts/generate-voiceover.mjs
```

Place a licensed background music file at `public/music.mp3`.

## Preview and render

```bash
npm run dev
npm run build
```

The output target is `out/the-boy-with-torn-shoes.mp4`.

## GitHub skill note

The official repository's documented commands are `npx skills add remotion-dev/skills` for a non-Remotion project, or `npx remotion skills add` inside an existing Remotion project. The package supports OpenCode, Claude Code, Codex, Cursor and other compatible agents. Skill installation happens in the local project/agent environment; a GitHub account connection alone does not install it on your laptop.
