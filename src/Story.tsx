import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { captions } from './captions';

const C = { ink: '#172033', cream: '#fff1d6', red: '#d95745', gold: '#ffd45a', sky: '#9ed8e8', grass: '#6caa72', brown: '#754b36' };

const SceneTitle: React.FC<{ kicker: string; title: string; sub?: string }> = ({ kicker, title, sub }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const y = spring({ frame: f, fps, config: { damping: 16, stiffness: 90 } });
  return <div style={{ position: 'absolute', top: 190, left: 70, right: 70, textAlign: 'center', transform: `translateY(${interpolate(y,[0,1],[45,0])}px)`, opacity: y }}>
    <div style={{ color: C.gold, fontSize: 30, fontWeight: 900, letterSpacing: 7, textTransform: 'uppercase' }}>{kicker}</div>
    <div style={{ color: 'white', fontSize: 76, lineHeight: 1.03, fontWeight: 950, textShadow: '0 5px 20px #17203388' }}>{title}</div>
    {sub && <div style={{ color: C.cream, fontSize: 34, marginTop: 24, fontWeight: 600 }}>{sub}</div>}
  </div>;
};

const Town: React.FC = () => <>
  <AbsoluteFill style={{ background: `linear-gradient(${C.sky},#eaf3dc 66%,${C.grass} 66%)` }} />
  {Array.from({ length: 7 }).map((_,i) => <div key={i} style={{ position:'absolute', bottom:620, left: i*170-30, width:190, height:260+(i%3)*35, background:['#e9a16f','#f3d078','#d98778','#a7c8a0'][i%4], border:'8px solid #fff0d2', borderRadius:'12px 12px 0 0' }}><div style={{ margin:'65px auto 0', width:58,height:90,background:'#5a6f82',border:'7px solid #fff0d2' }} /></div>)}
  <div style={{ position:'absolute', bottom:0, height:620, width:'100%', background:'linear-gradient(#79b96e,#4b895b)' }} />
  <div style={{ position:'absolute', bottom:520, width:'120%', left:'-10%', height:230, background:'#d8b78a', transform:'rotate(-3deg)', borderTop:'10px solid #f3d9ae' }} />
</>;

const Boy: React.FC<{ x: number; y?: number; scale?: number; gold?: boolean; running?: boolean; sad?: boolean }> = ({ x,y=0,scale=1,gold=false,running=false,sad=false }) => {
  const f=useCurrentFrame();
  const bob=running?Math.sin(f*0.42)*12:Math.sin(f*0.08)*2;
  const leg=Math.sin(f*0.5)*24;
  return <div style={{ position:'absolute', left:x, bottom:430+y, width:210*scale, height:430*scale, transform:`translateY(${bob}px) scale(${scale})`, transformOrigin:'bottom center' }}>
    <div style={{ position:'absolute', top:0,left:58,width:100,height:112,borderRadius:'48% 48% 44% 44%',background:'#9a603e',border:'7px solid #613e31' }} />
    <div style={{ position:'absolute', top:32,left:77,width:12,height:13,borderRadius:'50%',background:C.ink }} /><div style={{ position:'absolute',top:32,left:126,width:12,height:13,borderRadius:'50%',background:C.ink }}/>
    <div style={{ position:'absolute',top:65,left:91,width:35,height:8,borderBottom:'5px solid #713c34',borderRadius:'50%' }} />
    <div style={{ position:'absolute',top:105,left:43,width:130,height:185,background:'#d45c42',border:'7px solid #8c3d32',borderRadius:'35px 35px 18px 18px' }} />
    <div style={{ position:'absolute',top:265,left:57,width:42,height:125,background:'#334d68',borderRadius:18,transform:`rotate(${running?leg:0}deg)`,transformOrigin:'top center' }} />
    <div style={{ position:'absolute',top:265,left:116,width:42,height:125,background:'#334d68',borderRadius:18,transform:`rotate(${running?-leg:0}deg)`,transformOrigin:'top center' }} />
    <div style={{ position:'absolute',top:365,left:39,width:76,height:29,background:gold?C.gold:'#604334',borderRadius:'22px 10px 8px 8px',border:gold?'5px solid #fff0a0':'5px dashed #b99a7e',boxShadow:gold?'0 0 35px #ffd45a':'' }} />
    <div style={{ position:'absolute',top:365,left:108,width:76,height:29,background:gold?C.gold:'#604334',borderRadius:'22px 10px 8px 8px',border:gold?'5px solid #fff0a0':'5px dashed #b99a7e',boxShadow:gold?'0 0 35px #ffd45a':'' }} />
  </div>;
};

const Rival: React.FC<{ fallen?: boolean }> = ({fallen=false}) => <div style={{position:'absolute',right:130,bottom:450,width:230,height:370,transform:fallen?'rotate(78deg) translate(70px,60px)':'none',transformOrigin:'bottom center'}}>
  <div style={{position:'absolute',top:0,left:65,width:95,height:105,borderRadius:'50%',background:'#e0a477',border:'7px solid #8d6048'}} />
  <div style={{position:'absolute',top:100,left:35,width:155,height:170,background:'#4e78b5',border:'7px solid #2e4b78',borderRadius:35}} />
  <div style={{position:'absolute',top:255,left:50,width:48,height:105,background:'#303c55',borderRadius:20}}/><div style={{position:'absolute',top:255,left:125,width:48,height:105,background:'#303c55',borderRadius:20}}/>
  <div style={{position:'absolute',top:330,left:20,width:75,height:30,background:'#f1d8b8',borderRadius:20}}/><div style={{position:'absolute',top:330,left:110,width:75,height:30,background:'#f1d8b8',borderRadius:20}}/>
</div>;

const CaptionLayer: React.FC = () => {
  const f=useCurrentFrame();
  const active=captions.find(c=>f>=c.start&&f<c.end);
  if(!active)return null;
  return <div style={{position:'absolute',bottom:150,left:60,right:60,textAlign:'center',padding:'26px 30px',background:'#101827d9',borderRadius:24,border:'2px solid #ffffff35',color:'white',fontSize:43,fontWeight:850,lineHeight:1.15,textShadow:'0 3px 8px #000'}}>{active.text}</div>;
};

const Part: React.FC<{start:number;duration:number;children:React.ReactNode}> = ({start,duration,children}) => <Sequence from={start} durationInFrames={duration}>{children}</Sequence>;

export const Story: React.FC = () => {
  const f=useCurrentFrame();
  const glow=interpolate(f,[1450,1600,1800],[0,1,0.45],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:C.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <Audio src={staticFile('voiceover.mp3')} volume={1} />
    <Audio src={staticFile('music.mp3')} volume={0.18} />
    <Part start={0} duration={390}><Town/><SceneTitle kicker="A town of magic" title="THE GOLDEN RACE" sub="Only the fastest could win."/><Boy x={420} scale={1.1}/><Boy x={670} scale={0.9}/></Part>
    <Part start={390} duration={300}><Town/><SceneTitle kicker="The underdog" title="ONE BOY HAD" sub="Nothing but torn shoes… and a dream."/><Boy x={430} scale={1.2} sad/><div style={{position:'absolute',bottom:330,left:120,right:120,textAlign:'center',fontSize:32,color:'#fff',fontWeight:800}}>THEY LAUGHED AT HIM</div></Part>
    <Part start={690} duration={300}><Town/><SceneTitle kicker="The race begins" title="HE RAN WITH" sub="Every bit of strength he had."/><Boy x={interpolate(f,[690,990],[180,700],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} running scale={1.15}/><Rival/></Part>
    <Part start={990} duration={300}><Town/><SceneTitle kicker="The turning point" title="HE COULD WIN…" sub="Or he could stop and help."/><Boy x={360} scale={1.1}/><Rival fallen/></Part>
    <Part start={1290} duration={510}><Town/><SceneTitle kicker="The real victory" title="THEY FINISHED" sub="Side by side."/><Boy x={360} scale={1.1} gold/><Rival/><AbsoluteFill style={{background:`rgba(255,205,65,${glow*0.25})`,pointerEvents:'none'}}/><div style={{position:'absolute',top:760,left:90,right:90,textAlign:'center',fontSize:54,color:C.gold,fontWeight:950,textShadow:'0 0 28px #ffce4a'}}>KINDNESS IS THE REAL GOLD.</div></Part>
    <CaptionLayer/>
  </AbsoluteFill>;
};
