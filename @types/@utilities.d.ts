declare module '@utilities' {
  type PartiallyPartial<T, RequiredKeys extends keyof T> = Partial<
    Omit<T, RequiredKeys>
  > &
    Pick<T, RequiredKeys>;

  type Nullable<T> = T | undefined | null;
}
