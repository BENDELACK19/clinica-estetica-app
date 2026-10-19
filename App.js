import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './TelaLogin';
import TelaCadastro from './TelaCadastro';
import TelaPrincipal from './TelaPrincipal';
import Agendar from './Agendar';
import MinhasConsultas from './MinhasConsultas'
import TelaAdmin from './TelaAdmin'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>  
         
        
        <Stack.Screen name="Login" component={TelaLogin} />   
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Principal" component={TelaPrincipal} />
        <Stack.Screen name="Agendar" component={Agendar}/>
        <Stack.Screen name="MinhasConsultas" component={MinhasConsultas}/>
        <Stack.Screen name="Admin" component={TelaAdmin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
