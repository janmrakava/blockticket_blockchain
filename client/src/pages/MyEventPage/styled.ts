import styled from 'styled-components';

export const InfoEventContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 25px;
  gap: 100px;
  border-bottom: 1px solid #80797b;
`;

export const InfoEventContainerEventID = styled(InfoEventContainer)`
  gap: 20px;
`;
