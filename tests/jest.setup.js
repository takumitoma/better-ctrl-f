const { TextEncoder, TextDecoder } = require('util')

global.chrome = {
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
};

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;