import { Paper } from "@material-ui/core";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { ApiReadingMember } from "../../../types/api/apiTypes";

export type ReadingMembersProps = {
  members: ApiReadingMember[];
};

export default function index(props: ReadingMembersProps) {
  const { ...rest } = props;
  return <LayoutComponent {...rest}>Yo</LayoutComponent>;
}
