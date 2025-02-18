import { Router } from "./routes/Router.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import RQProvider from "./config/RQProvider.tsx";
import theme from "./styles/theme.ts";

function App() {
  return (
    <RQProvider>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </RQProvider>
  );
}

export default App;
