import React, {useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import Spinner from 'ink-spinner';
import clipboardy from 'clipboardy';

interface KeyPress {
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  return: boolean;
  [key: string]: boolean;
}

const BorderBox: React.FC<{
  children: React.ReactNode;
  borderColor?: string;
  borderStyle?: 'single' | 'double' | 'round';
}> = ({children, borderColor = 'white', borderStyle = 'single'}) => {
  const borders = {
    single: ['┌', '┐', '└', '┘', '─', '│'],
    double: ['╔', '╗', '╚', '╝', '═', '║'],
    round: ['╭', '╮', '╰', '╯', '─', '│']
  };

  const [tl, tr, bl, br, h, v] = borders[borderStyle];

  return (
    <Box flexDirection="column">
      <Text color={borderColor}>
        {tl}{h}{tr}
      </Text>
      <Box>
        <Text color={borderColor}>{v}</Text>
        <Box padding={1}>{children}</Box>
        <Text color={borderColor}>{v}</Text>
      </Box>
      <Text color={borderColor}>
        {bl}{h}{br}
      </Text>
    </Box>
  );
};

const App = () => {
  const {exit} = useApp();
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useInput((input: string, key: KeyPress) => {
    if (input === 'q') {
      exit();
    }

    if (key.ctrl && input === 'v') {
      setIsLoading(true);
      try {
        const text = clipboardy.readSync();
        setClipboardContent(text);
        setError('');
      } catch (err) {
        setError('Failed to read clipboard');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Gradient name="passion">
        <BigText text="Clipboard Viewer" />
      </Gradient>

      <Box marginY={1}>
        <BorderBox borderStyle="round" borderColor="cyan">
          <Text>
            Press <Text color="green">Ctrl+V</Text> to paste from clipboard
            {' '}(<Text color="red">q</Text> to quit)
          </Text>
        </BorderBox>
      </Box>

      {isLoading ? (
        <Box>
          <Text color="yellow">
            <Spinner type="dots" />
            {' Reading clipboard...'}
          </Text>
        </Box>
      ) : error ? (
        <Box marginY={1}>
          <BorderBox borderStyle="single" borderColor="red">
            <Text color="red">{error}</Text>
          </BorderBox>
        </Box>
      ) : clipboardContent ? (
        <Box marginY={1} flexDirection="column">
          <BorderBox borderStyle="double" borderColor="green">
            <Box flexDirection="column">
              <Text bold>Clipboard content:</Text>
              <Text color="green">{clipboardContent}</Text>
            </Box>
          </BorderBox>
        </Box>
      ) : (
        <Box marginY={1}>
          <Text dimColor>Waiting for clipboard content...</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text dimColor>Tip: You can paste multiple times to update the content</Text>
      </Box>
    </Box>
  );
};

export default App;
