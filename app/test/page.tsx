import { InfoCard } from '@/components/InfoCard';

export default function TestPage() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: '0.75rem',
        padding: '2rem',
        backgroundColor: '#0a0a0a',
        '--theme-border':  '#00c8ff',
        '--theme-heading': '#ffffff',
        '--theme-text':    '#ededed',
      } as React.CSSProperties}
    >
      <InfoCard
        label="YEAR"
        highlight="1984"
        description="Created on the Electronika 60. Popularized worldwide via Game Boy and NES."
      />
      <InfoCard
        label="SALES"
        highlight="+520M"
        description="Copies worldwide, including physical media and mobile downloads."
      />
      <InfoCard
        label="CREATORS"
        highlight="Alexey Pajitnov"
        description="Originally developed at the Soviet Academy of Sciences. Rights reclaimed in 1996 via The Tetris Company."
      />
    </div>
  );
}
