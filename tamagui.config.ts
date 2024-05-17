// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { config } from "@tamagui/config/v2";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createFont, createTamagui, createTokens } from "tamagui";
import { createMedia } from "@tamagui/react-native-media-driver";
// import { Text } from 'tamagui'
// import { createAnimations } from "@tamagui/animations-css";
const size = {
  1: 12,
  2: 14,
  3: 16,
  4: 18,
  5: 20,
  6: 22,
  7: 24,
  8: 26,
  9: 28,
  10: 30,
  11: 32,
  12: 34,
  13: 36,
  14: 38,
  true: 16
};

const lineHeight = {
  1: 16,
  2: 21,
  3: 22,
  4: 23,
  5: 26,
  6: 28,
  7: 30,
  8: 33,
  9: 41,
  10: 59,
  11: 69,
  12: 76,
  13: 87,
  14: 109,
  15: 133,
  16: 155,
  true: 23
};

const weight = {
  1: "100",
  2: "200"
};

const letterSpacing = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  true: 0
};

const tamaguiConfig = createTamagui({
  defaultFont: "body",
  fonts: {
    body: {
      family: "JostRegular",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    regular: {
      family: "JostRegular",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    subHead: {
      family: "JostMedium",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    heading: {
      family: "JostBold",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    medium: {
      family: "JostMedium",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    semiBold: {
      family: "JostSemiBold",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    bold: {
      family: "JostBold",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    },
    italic: {
      family: "JostItalic",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight
    }
  },
  tokens,
  shorthands,
  themes: {
    light: {
      color: "#fff"
    },
    dark: {
      bg: "#111",
      color: "#E5E4E2"
    },

    defaultProps: {}
  },
  media: createMedia({
    mob: { maxWidth: 600 },
    iPad: { minWidth: 600, maxWidth: 992 },
    iPadPro: { minWidth: 992, maxWidth: 1264 },
    mac: { minWidth: 1265, maxWidth: 1560 },
    specialCase: { width: 1024, height: 768 }
  })
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
