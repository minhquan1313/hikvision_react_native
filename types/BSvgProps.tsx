import { NumberProp, SvgProps } from "react-native-svg";

export interface BSvgProps extends SvgProps {
  size?: NumberProp;

  autoWidth?: boolean;
  autoHeight?: boolean;
}
