export type PromiseReturnType<T extends (...args: any) => any> =
  ReturnType<T> extends Promise<infer U> ? U : T
