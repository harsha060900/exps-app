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
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 23,
  9: 30,
  10: 46,
  11: 55,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 134,
  true: 14,
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
  true: 23,
};

const weight = {
  1: "100",
  2: "200",
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
  true: 0,
};

const tamaguiConfig = createTamagui({
  defaultFont: "body",
  fonts: {
    body: {
      family: "MetropolisRegular",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    regular: {
      family: "MetropolisRegular",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    heading: {
      family: "MetropolisRegular",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    medium: {
      family: "MetropolisMedium",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    semiBold: {
      family: "MetropolisSemiBold",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    bold: {
      family: "MetropolisBold",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
    italic: {
      family: "MetropolisItalic",
      letterSpacing: letterSpacing,
      lineHeight: lineHeight,
      size: size,
      weight: weight,
    },
  },
  tokens,
  shorthands,
  themes: {
    light: {
      color: "#122046",
    },
    dark: {
      bg: "#111",
      color: "#fff",
    },

    defaultProps: {},
  },
  media: createMedia({
    mob: { maxWidth: 600 },
    iPad: { minWidth: 600, maxWidth: 992 },
    iPadPro: { minWidth: 992, maxWidth: 1264 },
    mac: { minWidth: 1265, maxWidth: 1560 },
    specialCase: { width: 1024, height: 768 },
  }),
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
