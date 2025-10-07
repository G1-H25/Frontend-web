import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill för Node.js-miljö (TextEncoder / TextDecoder)
(globalThis as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(globalThis as unknown as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;
