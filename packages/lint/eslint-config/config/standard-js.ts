import recommendedJavascript from '../rules/recommended-javascript';

const config: any = [{
  files: ['**/*.js'],
  extends: [recommendedJavascript],
}];

export default config;
