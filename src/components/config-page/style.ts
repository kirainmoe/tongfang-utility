import { Form, Input, Tabs, Select } from "@arco-design/web-react";
import { ContentPageContainer } from "components/common/style";
import styled, { createGlobalStyle } from "styled-components";

export const ConfigPageStyles = createGlobalStyle`
  .ant-steps-item-title {
    font-size: 12px;
  }

  .ant-steps-item-icon {
    transform: scale(0.8);
  }
`;

// Welcome
export const ComponentVersionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;

  margin: 15px 10px;
`;

export const ComponentVersionItem = styled.div`
  padding: 15px;
  background: linear-gradient(to right, rgb(248, 249, 250) 0.38%, rgb(245, 246, 247) 100%);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  span {
    vertical-align: super;
    line-height: 20px;
    margin-left: 10px;
  }

  p {
    margin-top: 5px;
    margin-left: 30px;
    margin-bottom: 0;
  }

  p.action {
    display: none;
  }

  &:hover {
    p.version {
      display: none;
    }
    p.action {
      display: block;
    }
  }

  ${ContentPageContainer}.dark-mode & {
    background: linear-gradient(to right, #2a415b, #1a2c41);
  }
`;

// ModelSelector
export const SearchInput = styled(Input)`
  margin: 10px 0;
`;

export const ModelSelectorTab = styled(Tabs)`
  height: 360px;
  .arco-tabs-content {
    width: calc(100% - 20px);
    height: 320px;
    margin: 0 0px 0 20px;
    overflow: auto;
  }
`;

export const ModelSelectorGroup = styled.div`
  margin-bottom: 20px;
`;

export const ModelSelectorTitle = styled.h3`
  font-size: 18px;
  font-weight: 300;

  ${ContentPageContainer}.dark-mode & {
    color: #fff;
  }
`;

export const ModelSelectorGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

export const ModelSelectorGridItem = styled.div`
  font-size: 12px;
  padding: 16px;

  background: #f7f7f7;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: .2s all ease-out;

  ${ContentPageContainer}.dark-mode & {
    background: #2a415b;
  }

  &:hover {
    background: #d6d6d6;
  }

  &.active {
    background: #f1ffff;
    color: #0170fe;
  }
`;

export const CurrentSelected = styled.div`
  margin-left: 10px;
`;

export const SelectedModelTag = styled.span`
    color: #0170fe;
`;

// Customize
export const CustomizeGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;

  padding-top: 10px;
`;

// Personalize
export const StyledForm = styled(Form)`
  margin: 10px 0 10px 0;
  .ant-form-item {
    margin: 0 0 10px;
  }
`;

export const ImagePathContainer = styled.div`
  max-width: 400px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
  color: #888;
`;

export const StyledBootArgsSelect = styled(Select)`
  width: 100%;
  margin: 5px 0;
`;

export const DescriptionBlock = styled.div`
  color: #888;
  padding: 5px;
  font-size: 14px;
`;

// Generate
export const ListContainer = styled.ul`
  margin: 10px;
  
  .title {
    font-weight: 500;
  }
`;

// Processing
export const ProcessingContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
`;

export const StepIndicator = styled.h2`
  widht: 100%;
  font-weight: 500;
  font-size: 20px;
  margin: 40px 0;
  text-align: center;
`;

export const HavingTrouble = styled.a`
  width: 100%;
  text-align: center;
`;

// Done
export const DoneContainer = styled.div`
  margin: 50px 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  
  & > div {
    width: 100%;
  }

  svg {
    width: 100px;
    height: 100px;
  }
`;

export const DoneTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
`;

export const CenterAlignContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const DoneActionButton = styled.div`
  width: 120px;
  height: 120px;
  display: inline-block;

  cursor: pointer;
  vertical-align: top;

  padding: 15px;
  margin: 0 10px;

  font-size: 12px;

  &:hover {
    background: rgba(0, 0, 0, .1);
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

export const ESPItem = styled.div`
  padding: 10px;
  transition: .2s all ease-out;
  cursor: pointer;

  display: flex;
  flex-wrap: wrap;

  svg {
    width: 40px;
    height: 40px;
  }

  .icon {
    margin-right: 10px;
  }

  &:hover {
    background: rgba(0, 0, 0, .1);
  }

  .name-size {
    font-weight: 500;
  }
 
  .identifier {
    color: #888;
  }
`;

export const ConnectivityCheckerTips = styled.div`
  margin-left: 20px;
`;

export const SolutionItemTitle = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
`;

export const SolutionItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SolutionItem = styled.div`
  width: 140px;
  height: 140px;

  border-radius: 10px;
  cursor: pointer;

  padding: 10px;
  margin-right: 10px;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  transition: .25s ease-out;

  &:hover {
    background: #eee;
  }

  svg {
    width: 50px;
    height: 50px;
  }

  div p {
    margin: 0;
  }
`;