declare module 'ink-box' {
  import { ReactNode } from 'react';

  interface InkBoxProps {
    borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle' | 'classic';
    borderColor?: string;
    float?: 'left' | 'right' | 'center';
    padding?: number;
    margin?: number;
    children: ReactNode;
  }

  export default function InkBox(props: InkBoxProps): JSX.Element;
}
