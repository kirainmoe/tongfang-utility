import styled from 'styled-components';

export const CheckItemContainer = styled.div`
  text-align: center;
`;

export const CheckItemIconContainer = styled.div`
  svg {
    width: 100px;
    height: 100px;
  }
`;

export const CheckItemTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

export const CheckResultContainer = styled.div`
  line-height: 30px;
  font-size: 16px;
  margin-top: 10px;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    vertical-align: top;
  }
`;

export const CheckGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 40px;

  margin: 40px 10px 0 10px;
`;

export const ResultStatement = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 40px;
`;