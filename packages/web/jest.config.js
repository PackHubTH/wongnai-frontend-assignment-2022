module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/mocks/**",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
  },
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@pages/(.*)": "<rootDir>/src/pages/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@api/(.*)": "<rootDir>/src/api/$1",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/mock.ts",
    "\\.(css|less)$": "<rootDir>/mocks/mock.ts",
  },
  // transformIgnorePatterns: [
  //   '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
  // ],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
