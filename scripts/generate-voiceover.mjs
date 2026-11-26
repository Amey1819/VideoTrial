import fs from 'node:fs';

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
if (!apiKey) throw new Error('Set ELEVENLABS_API_KEY before generating the voiceover.');

const text = `Imagine a town where everyone's shoes could turn to gold... but only the fastest runner could win them. Every year, the town held a grand race. One poor boy had only torn, worn-out shoes. The other children laughed at him. Still, he ran with all his strength. Then the leading runner fell and hurt his leg. The boy stopped. He could still win... but instead, he helped his rival stand. Together, they crossed the finish line. A golden glow surrounded the boy's torn shoes. The greatest victory is never leaving someone behind.`;

const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
  method: 'POST',
  headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
  body: JSON.stringify({
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: { stability: 0.42, similarity_boost: 0.78, style: 0.35, use_speaker_boost: true }
  })
});
if (!response.ok) throw new Error(`ElevenLabs request failed (${response.status}): ${await response.text()}`);
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/voiceover.mp3', Buffer.from(await response.arrayBuffer()));
console.log('Saved public/voiceover.mp3');
