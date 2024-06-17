import Separator from "@/components/Base/Separator";
import { forwardRef, memo } from "react";

export interface UserSeparatorProps {
  //
}

export type UserSeparatorRef = null;

const UserSeparator = memo(
  forwardRef<UserSeparatorRef, UserSeparatorProps>(function UserSeparator(props, ref) {
    return <Separator className="ml-4" />;
  }),
);

export default UserSeparator;
