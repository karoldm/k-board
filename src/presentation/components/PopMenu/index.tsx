import { PropsWithChildren, useEffect, useState } from "react";
import { ChildrenContainer, ItemsContainer, StyledMenuItem, Wrapper } from "./style";

type MenuItem = {
  label: string;
  onClick: () => void;
}

type Props = {
  items: MenuItem[];
}

export const PopupMenu = ({children, items} : PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false);
  
  const toggle = () => {
    setOpened(prev => !prev);
  }

  
  return (
    <Wrapper>
      <ChildrenContainer onClick={toggle}>
        {children}
        {opened && <ItemsContainer>
          {
            items.map((item: MenuItem) => 
              <StyledMenuItem onClick={item.onClick}>
                <p>
                  {item.label}
                </p>
              </StyledMenuItem>
            )
          }
        </ItemsContainer>}
      </ChildrenContainer>
    </Wrapper>
  );
}