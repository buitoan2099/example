export type LoadingType = {
  isShow?: boolean;
};
export type LoadingRef = {
  show: (props?: LoadingType) => void;
  close: () => void;
};
