import BText from "@/components/BText";

export interface UserListProps {
  //
}

function UserList(props: UserListProps) {
  const {
    //

    ..._props
  } = props;

  return (
    <BText
      type="text"
      //
      {..._props}
    >
      {/*  */}
      UserList
    </BText>
  );
}

export default UserList;
