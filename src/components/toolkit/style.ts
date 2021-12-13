import styled from "styled-components";

export const ToolkitContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  overflow: hidden;
  padding: 0 10px;
`;

export const ToolkitItemContainer = styled.div`
  text-align: center;
  padding: 10px 10px; 

  transition: .25s all ease-out;
  cursor: pointer;

  .icon {
    svg {
      width: 90px;
      height: 90px;
      margin-bottom: 10px;
    }

    img.heliport-icon {
      width: 110px;
      height: 110px;
      margin-top: -15px;
      margin-bottom: 10px;
    }
  }

  .title {
    svg {
      width: 30px;
      height: 30px;
    }
  }

  .description {
    min-height: 20px;
    font-size: 12px;
  }

  &:hover {
    background: rgba(0, 0, 0, .1);
  }

  &.disabled {
    cursor: not-allowed;
    pointer-event: 
  }

  .fn-daemon-status {
    font-size: 10px;
    margin-top: 10px;
    color: #999;
  }

  .performing {
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    line-height: 30px;
    vertical-align: top;
  }
`;