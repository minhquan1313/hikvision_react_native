import BSafeAreaView from "@/components/Base/BSafeAreaView";
import BText from "@/components/Base/BText";
import BView from "@/components/Base/BView";
import DarkLightToggle from "@/components/Base/DarkLightToggle";
import { ScrollView } from "react-native";

export interface SettingProps {
  //
}

function Setting(props: SettingProps) {
  const {
    //

    ..._props
  } = props;

  return (
    <BSafeAreaView
      excludeEdges={["bottom"]}
      className="flex-1"
    >
      <ScrollView>
        <BView className="container">
          <BText type="text">
            modi cum deserunt suscipit necessitatibus dolorum quae ex porro ea voluptatem. Dolor, saepe voluptas delectus aliquid, ab repellat officia
            consequuntur fugit quae quia dicta, voluptatem doloribus! Voluptatum eveniet corrupti placeat quis dolor, itaque dolorum, tempore debitis
            labore autem, esse ex alias maiores et modi deleniti? Beatae quibusdam eum recusandae magni, officiis non debitis distinctio eaque libero
            aperiam consectetur aliquid quaerat ex eligendi perspiciatis blanditiis. Veniam tenetur obcaecati, atque distinctio, harum esse possimus
            itaque similique officiis doloribus dolor accusantium beatae eligendi earum vitae! Soluta corporis tempore, est maiores fugiat quaerat
            similique ullam voluptas doloribus. Soluta est reiciendis, quis nesciunt optio minima itaque iste vitae nostrum. Et quis ab culpa ullam
            nobis rerum nesciunt, eaque aperiam voluptatem laboriosam a, ad consequatur obcaecati. Magnam accusamus possimus natus. Distinctio enim
            deserunt similique numquam vero, accusantium molestiae dolorem officia. Enim sequi sint voluptate blanditiis maxime, saepe incidunt facere
            amet. Non, eius asperiores molestias nulla consequatur explicabo laborum minus ratione ut dignissimos dolorum eveniet earum reprehenderit!
            Libero doloremque, totam voluptatem dolores officia cum vel quae laudantium dolorum, mollitia deserunt ab, beatae dolorem laborum unde
            harum tempore aliquam repellat? Accusantium, temporibus ea amet asperiores illo vel reprehenderit facilis quo numquam consectetur, nihil
            praesentium ipsam quis iste error provident enim maxime inventore nesciunt possimus! Ea consequatur tempora enim in delectus facere saepe
            dolores assumenda, sed, quibusdam perspiciatis velit porro voluptate id omnis eum quia quod nobis asperiores aliquam suscipit neque nemo
            incidunt obcaecati? Asperiores, error nam dolorum esse nobis laudantium ut amet! Expedita maxime vero recusandae iste optio officiis!
            Voluptatibus, repudiandae cum quo voluptate nulla veniam maxime quam eius debitis exercitationem error incidunt vel consequuntur est
            facere inventore. Porro veritatis consequuntur dicta nam laborum ex a.
          </BText>
        </BView>

        <BView className="container">
          <DarkLightToggle />
        </BView>
      </ScrollView>
    </BSafeAreaView>
  );
}

export default Setting;
