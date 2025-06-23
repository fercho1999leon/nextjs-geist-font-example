import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, List, Divider, Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type ServicesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Services'>;
type ServicesScreenRouteProp = RouteProp<RootStackParamList, 'Services'>;

interface Props {
  navigation: ServicesScreenNavigationProp;
  route: ServicesScreenRouteProp;
}

export default function ServicesScreen({ route }: Props) {
  const { bankId } = route.params;
  const bank = banks.find((b) => b.id === bankId);
  const theme = useTheme();

  if (!bank) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{bank.name}</Title>
        <Text style={styles.headerSubtitle}>Servicios Disponibles</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Cuentas Bancarias</Title>
          <Text style={styles.description}>{bank.services.accounts.description}</Text>
          <List.Section>
            {bank.services.accounts.types.map((type, index) => (
              <List.Item
                key={index}
                title={type}
                left={props => <List.Icon {...props} icon="bank" color={theme.colors.primary} />}
                titleStyle={styles.listItemTitle}
              />
            ))}
          </List.Section>

          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Créditos</Title>
          <List.Section>
            {bank.services.credits.types.map((type, index) => (
              <List.Item
                key={index}
                title={type}
                left={props => <List.Icon {...props} icon="cash" color={theme.colors.primary} />}
                titleStyle={styles.listItemTitle}
              />
            ))}
          </List.Section>

          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Seguros</Title>
          <List.Section>
            {bank.services.insurance.types.map((type, index) => (
              <List.Item
                key={index}
                title={type}
                left={props => <List.Icon {...props} icon="shield" color={theme.colors.primary} />}
                titleStyle={styles.listItemTitle}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
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
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  listItemTitle: {
    fontSize: 16,
    color: '#333333',
  },
});
