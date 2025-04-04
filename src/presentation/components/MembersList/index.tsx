import { User } from '../../../data/interfaces/user'
import { Avatar } from '../Avatar'
import { Row } from '../Layouts/Row'

type Props = {
  members: User[]
  noToolTip?: boolean
}

export const MembersList = ({ members, noToolTip = false }: Props) => {
  return (
    <Row justifyContent='start'>
      {members.map((member, index) => (
        <Avatar
          tooltip={!noToolTip ? member.name : undefined}
          key={member.id}
          style={index != 0 ? { marginLeft: '-8px' } : {}}
          image={member.photoUrl}
        />
      ))}
    </Row>
  )
}
