export type KeyValueFrom<K extends string | number | symbol, V> = {
  [Key in K]: V;
};
