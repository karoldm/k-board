import { User } from "../../../data/interfaces/user";
import { Avatar } from "../Avatar";
import { Row } from "../Layouts/Row";

type Props = {
  members: User[];
}

export const MembersList = ({members}: Props) => {
  return (
    <Row justifyContent="start">
      {members.
        map((member, index) => 
          <Avatar 
            tooltip={member.name}
            key={member.id}
            style={ index != 0 ? {marginLeft: '-8px'} : {}} 
            src={member.photoUrl}
          />
      )}
      </Row>
  );
}