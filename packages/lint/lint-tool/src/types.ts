import { PROJECT_TYPE } from './constants';

export interface CliRunOptions {
  yes?: boolean
}

export type ProjectType = typeof PROJECT_TYPE[number]['value'];

export interface PromptResult {
  projectType: ProjectType
  enableStylelint: boolean
  enableMarkdownlint: boolean
  enableCommitlint: boolean
  updateVscodeSetting: boolean
}
