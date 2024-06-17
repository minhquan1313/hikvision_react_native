import { forwardRef, memo, useImperativeHandle } from "react";

export interface TestProps {
  //
}

export type TestRef = null;

const Test = memo(
  forwardRef<TestRef, TestProps>(function Test(props, ref) {
    const {
      //

      ..._props
    } = props;

    useImperativeHandle(
      ref,
      () => {
        return null;
      },
      [],
    );

    return (
      <div
        //
        {..._props}
      >
        {/*  */}
        Test
      </div>
    );
  }),
);

export default Test;
