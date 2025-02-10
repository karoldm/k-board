import styled from "styled-components";

export const TaskContent = styled.div`
overflow-y: scroll;
height: 100%;
display: flex;
flex-direction: column;
gap: 8px;
padding: 8px;
&::-webkit-scrollbar {
  width: 0;
}
`;

export const TaskContainer = styled.section<{percent: number}>`
display: flex;
flex-direction: column;
border-radius: 8px;
margin: 0 8px;
background: var(--white);
height: 100%;
border: 1px solid var(--primary);
height: calc(100vh - 108px);

#header {
background: var(--white);
border-bottom: 1px solid var(--primary);
padding: 8px;
border-radius: 8px 8px 0 0;
position: relative;

>p{
  color: var(--blue-light);
  font-size: 14px;
  z-index: 999;
  font-weight: bold;
}
}

#header::after {
content: "";
position: absolute;
border-radius: 8px ${props => props.percent >= 1 ? '8px' : 0} 0 0;
left: 0;
top: 0;
z-index: 0;
height: 100%;
width: ${props => (props.percent)*100+"%"};
background: var(--blue-primary);;
}

@media (min-width: 621px){
flex: 1;
}

@media (max-width: 620px){
width: 100%;
margin: 1rem 0;
}
`;