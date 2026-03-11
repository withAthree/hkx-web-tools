import recommendedJavascript from '../rules/recommended-javascript';

const config = [{
  files: ['**/*.js'],
  extends: [recommendedJavascript],
}];

export default config;
