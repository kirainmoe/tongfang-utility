import { RouteComponentProps } from 'react-router';

import {
  HelloIamge,
  HelloPageContainer,
  HelloText,
  ItWorksText,
  CodeArea,
} from './style';

import Rinco from 'resources/images/Rinco.png';

interface MatchParams {
  person: string;
}

interface HelloProps extends RouteComponentProps<MatchParams> {}

export default function Hello(props: HelloProps) {
  return (
    <HelloPageContainer>
      <HelloIamge src={Rinco} alt="Welcome To Aki's Boilerplate!" />
      <ItWorksText>Hello, {props.match.params.person}! It works!</ItWorksText>
      <HelloText>
        Edit <CodeArea>src/index.tsx</CodeArea> to start!
      </HelloText>
    </HelloPageContainer>
  );
}
