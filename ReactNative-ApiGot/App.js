import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet,View,ActivityIndicator } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput, Text } from 'react-native-paper';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const axios = require('axios').default; 



function HomeScreen() {
 return (
  <View  style={styles.container}>
      <Text>Home Screen</Text>     
 </View>
 );
}


function ApiScreen(){

  const [personaje, setPersonaje] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [personajeID, setPersonajeID] = React.useState();
  
  function click(){
    setLoading(true);
    axios.get('https://thronesapi.com/api/v2/Characters/'+personajeID)
    .then(function (response){
      let personaje = response.data;
      setPersonaje(personaje)
      setLoading(false);
    })
    .catch(function (error){
        console.log(error);
    });

  }


  return(
<View  style={styles.container}>
     <TextInput
      label="Ingresar id del personaje"
      onChangeText={(text) => setPersonajeID(text)}
    />
    {!loading ? <Button style={styles.btn}  mode="contained" onPress={ () => click() }>
    Obtener personaje de got
    </Button> : <ActivityIndicator />}
        <Card>
          <Card.Cover style={styles.imagen} source={{ uri: personaje.imageUrl }} />
          <Card.Content>
            <View>
            {personaje ? <Title> {personaje.fullName} </Title>: null}
            </View>
            {personaje ? <Paragraph> {personaje.title} </Paragraph> : null}
            {personaje ? <Paragraph> {personaje.family} </Paragraph> : null}
          </Card.Content>
        </Card>
    </View>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Personajes Got" component={ApiScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btn:{
    marginTop: 50,
    marginBottom: 50,
    width: 250,
    alignSelf: 'center',
  },
  imagen: {
    width: 400,
    height: 250,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  margen: {
    marginEnd: 20,
  },
});
