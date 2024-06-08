import BView from "@/components/Base/BView";
import { ViewProps } from "react-native";
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";

export interface BSafeAreaViewProps extends ViewProps {
  mode?: "padding" | "margin";
  edges?: Edge[];
  excludeEdges?: Edge[];
}

function BSafeAreaView(props: BSafeAreaViewProps) {
  const {
    edges = ["top", "bottom", "left", "right"],
    mode = "padding",
    excludeEdges = [],

    style: additionStyle,
    ..._props
  } = props;
  const insets = useSafeAreaInsets();

  const styles = edges
    .reduce<Edge[]>((total, edge) => {
      if (excludeEdges.includes(edge)) return total;

      return [...total, edge];
    }, [])
    .map((edge) => ({ [mode + edge[0].toUpperCase() + edge.slice(1)]: insets[edge] }))
    .reduce((total, edge) => ({ ...total, ...edge }), {});

  return (
    <BView
      {..._props}
      style={[styles, additionStyle]}
    />
  );
}

export default BSafeAreaView;
