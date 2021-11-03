import styled from "styled-components";

export const ToolkitContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 25px;
`;

export const ToolkitItemContainer = styled.div`
  text-align: center;
  padding: 20px 15px; 

  transition: .25s all ease-out;
  cursor: pointer;

  .icon {
    svg {
      width: 100px;
      height: 100px;
    }

    img.heliport-icon {
      width: 120px;
      height: 120px;
      margin-top: -15px;
    }
  }

  .description {
    font-size: 12px;

    svg {
      width: 30px;
      height: 30px;
    }
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