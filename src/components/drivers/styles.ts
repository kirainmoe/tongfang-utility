import { Select } from '@arco-design/web-react';
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

  .download-btn, .delete-btn {
    margin: 10px 0 10px 10px;
  }
`;

export const DownloadingProgressIndicator = styled.div`
  margin: 20px 0;
  color: #888;
  font-size: 12px;
`;

export const ActionButtonGroup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export const DownloadProblemTags = styled.div`
  position: fixed;
  bottom: 25px;
  left: 120px;
`;