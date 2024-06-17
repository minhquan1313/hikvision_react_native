export interface IControlledComponent<T = unknown> {
  value?: T;
  onChange?: (value: T) => void;
}
