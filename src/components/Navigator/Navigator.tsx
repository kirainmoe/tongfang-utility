import { NavigationLink, NavigatorContainer } from "./style";

export default function Navigator() {
  return (
    <NavigatorContainer>
      <NavigationLink to='/hello/world'>Home</NavigationLink>
      <NavigationLink to='/counter'>Counter</NavigationLink>
    </NavigatorContainer>
  );
}