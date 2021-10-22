import { Select } from 'antd';
import styled from "styled-components";

export interface StyledSelectProps {
  minWidth?: number;
}

export const StyledSelect = styled(Select)<StyledSelectProps>`
  margin: 10px 0;
  min-width: ${props => props.minWidth}%;
`;

StyledSelect.defaultProps = {
  minWidth: 100,
};

export const DownloadSelectContainer = styled.div`
  display: flex;
  justify-content: space-around;

  .ant-btn {
    margin: 10px 0;
  }
`;

export const DownloadingProgressIndicator = styled.div`
  margin: 20px 0;
  color: #888;
  font-size: 12px;
`;