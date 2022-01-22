import styled from 'styled-components';

export const UserPanelOuterContainer = styled.div`
  position: fixed;
  width: calc(100vw - 80px);
  height: calc(100vh - 50px);
  top: 50px;
  left: 80px;
  border-radius: 8px 0 0 0;
  z-index: 1000;
  background: rgba(0, 0, 0, .15);
`;

export const UserPanelContainer = styled.div`
  width: 300px;
  height: 120px;
  background: #fafafa;
  position: fixed;
  top: 60px;
  border-radius: 8px;
  right: 10px;
  z-index: 2000;
  box-shadow: 0px 1px 2px -2px rgba(0, 0, 0, .16),
    0px 3px 6px 0px rgba(0, 0, 0, .12),
    0px, 5px, 12px, 4px, rgba(0, 0, 0, .09);
  padding: 20px 15px;
`;

export const UserAvatarContainer = styled.div`
  display: inline-block;
  img {
    width: 80px;
    height: 80px;
  }
`;

export const UserInfoContainer = styled.div`
  width: 160px;
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;

  .user-nickname {
    font-size: 18px;
    font-weight: 500;
  }

  .user-nickname-input {
    width: 120px;
  }

  .edit-name, .save-name {
    margin-left: 10px;
    cursor: pointer;
  }

  .join-beta {
    margin-top: 8px;
    .tag {
      margin-left: 10px;
    }
  }

  .user-id {
    margin-top: 8px;
    font-size: 12px;
    color: #888;
  }
`;

export const AvatarImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const AvatarFrame = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  z-index: 300;
  top: -50px;
  left: -50px;
`;