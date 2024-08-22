import { TextEncoder, TextDecoder } from 'util';

global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      hasListener: jest.fn(),
      hasListeners: jest.fn(),
      getRules: jest.fn(),
      removeRules: jest.fn(),
      addRules: jest.fn(),
    },
  } as Partial<typeof chrome.runtime>, 
} as typeof chrome;

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
