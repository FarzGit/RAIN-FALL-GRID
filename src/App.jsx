import RainGrid from "./pages/rainGrid"
import styled from 'styled-components';



const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Header = styled.header`
  font-size: 3rem;
  margin-bottom: 20px;
`;

function App() {


  return (
    <>
      <AppContainer>
      <Header className="font-bold ">Rainfall Grid</Header>
      <RainGrid />

    </AppContainer>
       
    </>
  )
}

export default App
