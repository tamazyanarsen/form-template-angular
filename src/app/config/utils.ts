export function copyObject<T>(obj: Record<string, unknown>): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function log(...args: unknown[]) {
  console.log(JSON.parse(JSON.stringify(args)));
}

export function asBoolean(value: unknown): boolean {
  return <boolean>value;
}
