import React, { useState } from 'react';

const KS = "0.45 0 0.55 1;0.45 0 0.55 1";
const DUR = "2.8s";
const DUR_SLOW = "3.5s";

const C = '#c4c4d4';   // static limb color
const A = '#60a5fa';   // animated/accent color
const FL = '#252535';  // floor color

function Ln({ x1, y1, x2, y2, col = C, w = 2.5 }: { x1: number; y1: number; x2: number; y2: number; col?: string; w?: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={w} strokeLinecap="round" fill="none" />;
}
function Hd({ cx, cy, r = 11, col = C }: { cx: number; cy: number; r?: number; col?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={2} />;
}
function Note({ t }: { t: string }) {
  return <text x="130" y="118" fill="#555" fontSize="9" textAnchor="middle" fontFamily="system-ui">{t}</text>;
}

// ─── Dead Bug ─────────────────────────────────────────────────────────────────
// Supine. Blue arm extends overhead (CCW -55°), blue leg extends from tabletop (CW +76°).
function DeadBug() {
  return (
    <svg viewBox="0 0 260 120" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={90} x2={250} y2={90} col={FL} />
      <Ln x1={44} y1={60} x2={185} y2={60} />
      <Hd cx={30} cy={60} />
      {/* Static left arm – pointing up */}
      <Ln x1={78} y1={60} x2={78} y2={30} />
      {/* Animated right arm – extends overhead */}
      <g>
        <Ln x1={100} y1={60} x2={100} y2={30} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 100 60;-55 100 60;0 100 60`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      {/* Static right leg – tabletop */}
      <Ln x1={160} y1={60} x2={160} y2={36} />
      <Ln x1={160} y1={36} x2={190} y2={36} />
      {/* Animated left leg – extends from tabletop */}
      <g>
        <Ln x1={138} y1={60} x2={138} y2={36} col={A} w={3} />
        <Ln x1={138} y1={36} x2={168} y2={36} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 138 60;76 138 60;0 138 60`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="blue = moving limbs · opposite arm + leg at the same time" />
    </svg>
  );
}

// ─── Bird Dog ─────────────────────────────────────────────────────────────────
// All-fours. Blue arm extends forward (CCW -90°), blue leg extends back (CW +90°).
function BirdDog() {
  return (
    <svg viewBox="0 0 260 125" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={100} x2={250} y2={100} col={FL} />
      <Ln x1={78} y1={58} x2={198} y2={58} />
      <Hd cx={213} cy={48} />
      <Ln x1={202} y1={54} x2={198} y2={58} />
      {/* Static left arm – down */}
      <Ln x1={175} y1={58} x2={175} y2={95} />
      {/* Animated right arm – extends forward right */}
      <g>
        <Ln x1={153} y1={58} x2={153} y2={95} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 153 58;-90 153 58;0 153 58`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      {/* Static right knee – down */}
      <Ln x1={108} y1={58} x2={108} y2={95} />
      {/* Animated left leg – extends back left */}
      <g>
        <Ln x1={83} y1={58} x2={83} y2={95} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 83 58;90 83 58;0 83 58`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="keep hips level · don't rotate · core tight throughout" />
    </svg>
  );
}

// ─── Romanian Deadlift ────────────────────────────────────────────────────────
// Upper body (blue) hinges forward 65° around hip point.
function Rdl() {
  return (
    <svg viewBox="0 0 200 160" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={148} x2={190} y2={148} col={FL} />
      {/* Static legs (slight knee bend) */}
      <Ln x1={100} y1={88} x2={88} y2={118} />
      <Ln x1={88} y1={118} x2={85} y2={148} />
      <Ln x1={100} y1={88} x2={112} y2={118} />
      <Ln x1={112} y1={118} x2={115} y2={148} />
      {/* Animated upper body – rotates forward at hip */}
      <g>
        <circle cx={100} cy={18} r={11} fill="none" stroke={A} strokeWidth={2} />
        <line x1={100} y1={29} x2={100} y2={88} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={80} y1={42} x2={120} y2={42} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={80} y1={42} x2={75} y2={80} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={120} y1={42} x2={125} y2={80} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 100 88;65 100 88;0 100 88`}
          dur={DUR_SLOW} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <text x="100" y="158" fill="#555" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        hinge at hips · flat back · feel the hamstring pull
      </text>
    </svg>
  );
}

// ─── Superman Hold ────────────────────────────────────────────────────────────
// Prone. Blue arm lifts (CCW -35°), blue opposite leg lifts (CW +35°).
function Superman() {
  return (
    <svg viewBox="0 0 270 110" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={85} x2={260} y2={85} col={FL} />
      <Ln x1={50} y1={68} x2={218} y2={68} />
      <Hd cx={232} cy={62} />
      {/* Static right arm – pointing right at rest */}
      <Ln x1={195} y1={68} x2={220} y2={68} />
      {/* Animated left arm – lifts upward (CCW around shoulder 190,68) */}
      <g>
        <Ln x1={190} y1={68} x2={215} y2={68} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 190 68;-35 190 68;0 190 68`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      {/* Static left leg – pointing left */}
      <Ln x1={80} y1={68} x2={55} y2={68} />
      {/* Animated right leg – lifts upward (CW around hip 85,68) */}
      <g>
        <Ln x1={85} y1={68} x2={60} y2={68} col={A} w={3} />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 85 68;35 85 68;0 85 68`}
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="lift all four limbs · squeeze glutes · hold 2s at top" />
    </svg>
  );
}

// ─── Inverted Row ─────────────────────────────────────────────────────────────
// Under bar/table edge. Body (blue) rises from extended to pulled position.
function InvertedRow() {
  return (
    <svg viewBox="0 0 260 145" style={{ display: 'block', width: '100%' }}>
      <style>{`
        @keyframes ir-ext { 0%,40%{opacity:1} 55%,95%{opacity:0} 100%{opacity:1} }
        @keyframes ir-pull { 0%,40%{opacity:0} 55%,95%{opacity:1} 100%{opacity:0} }
      `}</style>
      <Ln x1={10} y1={132} x2={250} y2={132} col={FL} />
      {/* Bar */}
      <Ln x1={75} y1={20} x2={185} y2={20} col={C} w={3} />
      <Ln x1={75} y1={8} x2={75} y2={20} col={C} />
      <Ln x1={185} y1={8} x2={185} y2={20} col={C} />
      {/* Grip points */}
      <circle cx={100} cy={20} r={4} fill={C} />
      <circle cx={160} cy={20} r={4} fill={C} />

      {/* Position 1: Arms extended, body low */}
      <g style={{ animation: 'ir-ext 3s ease-in-out infinite' }}>
        <line x1={100} y1={20} x2={92} y2={58} stroke={A} strokeWidth={3} strokeLinecap="round" />
        <line x1={160} y1={20} x2={168} y2={58} stroke={A} strokeWidth={3} strokeLinecap="round" />
        <line x1={92} y1={58} x2={168} y2={58} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={130} y1={58} x2={148} y2={100} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={148} y1={100} x2={168} y2={132} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={175} cy={56} r={10} fill="none" stroke={A} strokeWidth={2} />
      </g>

      {/* Position 2: Arms bent, chest near bar */}
      <g style={{ animation: 'ir-pull 3s ease-in-out infinite' }}>
        <line x1={100} y1={20} x2={110} y2={40} stroke={A} strokeWidth={3} strokeLinecap="round" />
        <line x1={160} y1={20} x2={150} y2={40} stroke={A} strokeWidth={3} strokeLinecap="round" />
        <line x1={110} y1={40} x2={150} y2={40} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={130} y1={40} x2={150} y2={85} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={150} y1={85} x2={168} y2={132} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={160} cy={38} r={10} fill="none" stroke={A} strokeWidth={2} />
      </g>
      <Note t="feet on floor · pull chest to bar · elbows drive back" />
    </svg>
  );
}

// ─── Cossack Squat ────────────────────────────────────────────────────────────
// Wide stance. Blue body shifts left into a deep side squat. Two-position crossfade.
function Cossack() {
  return (
    <svg viewBox="0 0 260 135" style={{ display: 'block', width: '100%' }}>
      <style>{`
        @keyframes cs-ctr { 0%,35%{opacity:1} 50%,90%{opacity:0} 100%{opacity:1} }
        @keyframes cs-lft { 0%,35%{opacity:0} 50%,90%{opacity:1} 100%{opacity:0} }
      `}</style>
      <Ln x1={10} y1={122} x2={250} y2={122} col={FL} />
      {/* Position 1: Center standing, wide stance */}
      <g style={{ animation: 'cs-ctr 3s ease-in-out infinite' }}>
        <Hd cx={130} cy={22} col={A} />
        <line x1={130} y1={33} x2={130} y2={72} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={108} y1={48} x2={152} y2={48} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={108} y1={48} x2={95} y2={62} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={152} y1={48} x2={165} y2={62} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={115} y1={72} x2={55} y2={122} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={145} y1={72} x2={205} y2={122} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      {/* Position 2: Squatting deep on left, right leg extended straight */}
      <g style={{ animation: 'cs-lft 3s ease-in-out infinite' }}>
        <Hd cx={80} cy={30} col={A} />
        <line x1={80} y1={41} x2={80} y2={78} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={60} y1={55} x2={100} y2={55} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={60} y1={55} x2={48} y2={68} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={100} y1={55} x2={112} y2={68} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Left leg – bent deeply */}
        <line x1={68} y1={78} x2={55} y2={100} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={55} y1={100} x2={55} y2={122} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Right leg – extended straight */}
        <line x1={92} y1={78} x2={205} y2={118} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Right foot */}
        <line x1={205} y1={118} x2={210} y2={122} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <Note t="shift weight to one side · other leg extends · go as low as comfy" />
    </svg>
  );
}

// ─── 90/90 Hip Stretch ────────────────────────────────────────────────────────
// Seated with both legs at 90° angles. Upper body gently leans forward.
function Stretch9090() {
  return (
    <svg viewBox="0 0 260 130" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={118} x2={250} y2={118} col={FL} />
      {/* Front leg (left): shin across, thigh forward */}
      <Ln x1={130} y1={88} x2={80} y2={88} col={C} w={3} />   {/* thigh */}
      <Ln x1={80} y1={88} x2={80} y2={118} col={C} w={3} />  {/* shin down */}
      {/* Back leg (right): thigh to the side, shin back */}
      <Ln x1={130} y1={88} x2={175} y2={88} col={C} w={3} />  {/* thigh right */}
      <Ln x1={175} y1={88} x2={175} y2={118} col={C} w={3} /> {/* shin down */}
      {/* Animated upper body – sits tall then gently leans forward */}
      <g>
        <Hd cx={130} cy={32} col={A} />
        <line x1={130} y1={43} x2={130} y2={88} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={110} y1={55} x2={150} y2={55} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 130 88;18 130 88;0 130 88`}
          dur={DUR_SLOW} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="both legs at 90° · sit tall · gently fold forward over front shin" />
    </svg>
  );
}

// ─── Pigeon Pose ──────────────────────────────────────────────────────────────
// Front leg bent across body, back leg extended. Upper body folds forward.
function Pigeon() {
  return (
    <svg viewBox="0 0 260 128" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={116} x2={250} y2={116} col={FL} />
      {/* Front leg: bent across, knee left, foot right */}
      <Ln x1={105} y1={90} x2={68} y2={112} col={C} w={3} />   {/* thigh to knee-left */}
      <Ln x1={68} y1={112} x2={145} y2={108} col={C} w={3} />  {/* shin across */}
      {/* Back leg: extends straight behind to right */}
      <Ln x1={115} y1={90} x2={210} y2={112} col={C} w={3} />
      {/* Hip/pelvis area */}
      <Ln x1={95} y1={90} x2={125} y2={90} col={C} w={3} />
      {/* Animated upper body – upright then folds forward over front leg */}
      <g>
        <Hd cx={110} cy={34} col={A} />
        <line x1={110} y1={45} x2={110} y2={90} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={90} y1={58} x2={130} y2={58} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="rotate"
          values={`0 110 90;38 110 90;0 110 90`}
          dur={DUR_SLOW} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="front leg bent · back leg straight · fold forward over front shin" />
    </svg>
  );
}

// ─── Hip Flexor Lunge Stretch ─────────────────────────────────────────────────
// Kneeling lunge. Upright body, back knee down. Gentle forward hip drive.
function HipFlexor() {
  return (
    <svg viewBox="0 0 220 145" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={132} x2={210} y2={132} col={FL} />
      {/* Back knee on floor */}
      <Ln x1={80} y1={115} x2={80} y2={132} col={C} w={3} />
      {/* Back leg (thigh) from knee up to hip */}
      <Ln x1={80} y1={115} x2={108} y2={88} col={C} w={3} />
      {/* Front foot on floor */}
      <Ln x1={162} y1={118} x2={170} y2={132} col={C} w={3} />
      {/* Front leg shin */}
      <Ln x1={140} y1={88} x2={162} y2={118} col={C} w={3} />
      {/* Front thigh */}
      <Ln x1={108} y1={88} x2={140} y2={88} col={C} w={3} />

      {/* Animated upper body – drives hips slightly forward */}
      <g>
        <Hd cx={110} cy={28} col={A} />
        <line x1={110} y1={39} x2={110} y2={88} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={90} y1={52} x2={130} y2={52} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 8 4; 0 0"
          dur={DUR_SLOW} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <text x="110" y="142" fill="#555" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        back knee down · drive hip forward · feel stretch in front of back hip
      </text>
    </svg>
  );
}

// ─── Hollow Body Hold ─────────────────────────────────────────────────────────
// Supine. Arms overhead, legs slightly raised, lower back pressed to floor. Pulse to indicate hold.
function HollowBody() {
  return (
    <svg viewBox="0 0 260 110" style={{ display: 'block', width: '100%' }}>
      <style>{`
        @keyframes hb-pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
      `}</style>
      <Ln x1={10} y1={88} x2={250} y2={88} col={FL} />
      {/* Whole body pulses to indicate sustained hold */}
      <g style={{ animation: 'hb-pulse 2.5s ease-in-out infinite' }}>
        <Hd cx={28} cy={62} col={A} />
        {/* Body */}
        <line x1={40} y1={62} x2={185} y2={62} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Arms reaching overhead (pointing right, slightly above body) */}
        <line x1={80} y1={62} x2={110} y2={52} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={110} y1={52} x2={145} y2={45} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Legs raised slightly off floor */}
        <line x1={185} y1={62} x2={210} y2={55} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={210} y1={55} x2={240} y2={50} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Lower back pressed to floor indicator */}
        <line x1={115} y1={62} x2={115} y2={76} stroke={A} strokeWidth={1.5} strokeDasharray="3,3" />
        <line x1={105} y1={76} x2={125} y2={76} stroke={A} strokeWidth={1.5} />
      </g>
      <Note t="arms + legs hover · lower back PRESSED to floor · breathe" />
    </svg>
  );
}

// ─── Glute Bridge ─────────────────────────────────────────────────────────────
// Supine. Hips drive up and lower. Blue hip group animates.
function GluteBridge() {
  return (
    <svg viewBox="0 0 260 120" style={{ display: 'block', width: '100%' }}>
      <Ln x1={10} y1={95} x2={250} y2={95} col={FL} />
      <Hd cx={28} cy={65} />
      {/* Body on floor */}
      <Ln x1={40} y1={65} x2={105} y2={65} />
      {/* Feet flat on floor (static) */}
      <Ln x1={175} y1={80} x2={185} y2={95} col={C} w={3} />
      <Ln x1={195} y1={80} x2={205} y2={95} col={C} w={3} />
      {/* Animated hip bridge – hips lift */}
      <g>
        <line x1={105} y1={65} x2={130} y2={45} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={130} y1={45} x2={158} y2={65} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={158} y1={65} x2={175} y2={80} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={158} y1={65} x2={195} y2={80} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 0 28; 0 0"
          dur={DUR} repeatCount="indefinite" calcMode="spline" keySplines={KS} />
      </g>
      <Note t="drive hips to ceiling · squeeze glutes hard · hold 2s at top" />
    </svg>
  );
}

// ─── Side Plank ───────────────────────────────────────────────────────────────
// On side, forearm on floor, body lifted in a straight line. Pulse to indicate hold.
function SidePlank() {
  return (
    <svg viewBox="0 0 260 110" style={{ display: 'block', width: '100%' }}>
      <style>{`
        @keyframes sp-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
      <Ln x1={10} y1={90} x2={250} y2={90} col={FL} />
      <g style={{ animation: 'sp-pulse 2.5s ease-in-out infinite' }}>
        {/* Forearm on floor */}
        <Ln x1={38} y1={90} x2={75} y2={90} col={C} w={3} />
        {/* Body angled up from elbow */}
        <line x1={55} y1={90} x2={185} y2={52} stroke={A} strokeWidth={3} strokeLinecap="round" />
        {/* Head */}
        <Hd cx={198} cy={47} col={A} />
        {/* Top arm reaching up */}
        <line x1={155} y1={58} x2={160} y2={36} stroke={A} strokeWidth={2.5} strokeLinecap="round" />
        {/* Feet stacked */}
        <Ln x1={38} y1={90} x2={55} y2={90} col={C} w={4} />
      </g>
      <Note t="body straight head to heel · don't let hips sag · hold time each side" />
    </svg>
  );
}

// ─── Demo Map ─────────────────────────────────────────────────────────────────
const DEMOS: Record<string, () => React.ReactElement> = {
  dead_bug: DeadBug,
  bird_dog: BirdDog,
  rdl: Rdl,
  superman: Superman,
  inverted_row: InvertedRow,
  cossack: Cossack,
  stretch_9090: Stretch9090,
  pigeon: Pigeon,
  hip_flexor: HipFlexor,
  hollow_body: HollowBody,
  glute_bridge: GluteBridge,
  side_plank: SidePlank,
};

interface Props {
  demoId: string;
  accentColor: string;
}

export function ExerciseDemo({ demoId, accentColor }: Props) {
  const [open, setOpen] = useState(false);
  const Demo = DEMOS[demoId];
  if (!Demo) return null;

  return (
    <div className="demo-wrapper">
      <button
        className="demo-btn"
        style={{ borderColor: accentColor, color: accentColor }}
        onClick={() => setOpen(o => !o)}
      >
        {open ? '▾ Hide Demo' : '▸ Demo'}
      </button>
      {open && (
        <div className="demo-panel">
          <Demo />
        </div>
      )}
    </div>
  );
}
