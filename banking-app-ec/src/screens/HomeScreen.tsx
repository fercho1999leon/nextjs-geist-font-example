import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Title, Text, Button, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Bienvenido a la Banca del Ecuador
        </Text>
        <Text style={styles.subHeaderText}>
          Explore los servicios y productos de los principales bancos
        </Text>
      </View>
      {banks.map((bank) => (
        <Card key={bank.id} style={styles.card} mode="elevated">
          <Card.Cover 
            source={{ uri: bank.logo }} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.bankName}>{bank.name}</Title>
            <Text style={styles.description}>
              {bank.services.accounts.description}
            </Text>
          </Card.Content>
          <View style={styles.actionsContainer}>
            <View style={styles.actions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Services', { bankId: bank.id })}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
              >
                Servicios
              </Button>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Rates', { bankId: bank.id })}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
              >
                Tasas
              </Button>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Requirements', { bankId: bank.id })}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
              >
                Requisitos
              </Button>
            </View>
            <View style={styles.actions}>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Calculator', { bankId: bank.id })}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
              >
                Calculadora
              </Button>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Location', { bankId: bank.id })}
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                labelStyle={styles.buttonLabel}
              >
                Ubicaciones
              </Button>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#1a1a1a',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  logo: {
    height: 120,
    backgroundColor: '#ffffff',
    marginVertical: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bankName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
});
