import styled from "styled-components";

// DeviceInfo
export const DeviceInfoContainer = styled.div``;

export const MacBookImageContainer = styled.img`
  max-width: 180px;
  margin: 10px 20px 10px 0;
  margin-right: 20px;
  display: block;
`;

export const SpecialContainer = styled.div`
  margin: 10px 0;
`;

export const FlexStartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const DeviceContainer = styled.div`
  width: 360px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HardwareSpecContainer = styled.div`
  width: 200px;
  position: absolute;
  right: -10px;
  span {
    display: block;
    margin-bottom: 5px;
  }
  span.property-name {
    font-size: 12px;
    font-weight: bold;
  }
  span.value {
    font-size: 10px;
    margin-bottom: 10px;
  }
`;

export const DeviceInfoItemContainer = styled.div`
  font-size: 14px;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  span {
    vertical-align: top;
  }

  span.property-name {
    display: inline-block;
    width: 80px;
    font-weight: 500;
    margin-right: 20px;
    line-height: 20px;
    vertical-align: top;
  }
  span.value {
    display: inline-block;
    max-width: 300px;
    line-height: 20px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    vertical-align: top;
  }
`;

export const HardwareSpecItemContainer = styled.div``;

// ResourceMonitor
export const ResourceMonitorContainer = styled.div`
  margin: 25px 0 10px 0;
`;

export const ChartGrid = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
`;

export const ChartItem = styled.div`
  max-height: 180px;
  overflow: hidden;
  padding: 15px 10px;
  position: relative;

  .chart-item-tag {
    display: block;
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
  }

  &.temperature-chart {
    width: 200px;
    padding: 0px;
    .chart-item-tag {
      position: absolute;
      width: 100%;
      bottom: 15px;
    }
  }
`;

// PowerModeSwitcer
export const PowerSwitcherContainer = styled.div``;

export const PowerSwitcherGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;

  margin-top: 10px;
`;

export const PowerModeItemContainer = styled.div`
  padding: 20px 10px;
  display: flex;
  cursor: pointer;

  transition: .25s all ease-out;

  &:hover {
    background: rgba(0, 0, 0, .05);
  }
`;

export const PowerModeItemIcon = styled.div`
  margin-right: 10px;
  svg {
    width: 60px;
    height: 60px;
  }
`;

export const PowerModeItemText = styled.div`
  .text-title {
    font-size: 16px;
    font-weight: bold;
  }
  .text-description {
    color: #888;
    margin-top: 5px;
    font-size: 12px;
  }
`;