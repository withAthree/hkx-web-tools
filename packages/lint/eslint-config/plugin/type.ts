export type SeverityName = 'off' | 'warn' | 'error';

export type SeverityLevel = 0 | 1 | 2;

export type Severity = SeverityName | SeverityLevel;

export type RuleConfig<T extends unknown[] = unknown[]> = Severity | [Severity, ...Partial<T>];
