import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, DataTable, Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type RatesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rates'>;
type RatesScreenRouteProp = RouteProp<RootStackParamList, 'Rates'>;

interface Props {
  navigation: RatesScreenNavigationProp;
  route: RatesScreenRouteProp;
}

export default function RatesScreen({ route }: Props) {
  const { bankId } = route.params;
  const bank = banks.find((b) => b.id === bankId);
  const theme = useTheme();

  if (!bank) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{bank.name}</Title>
        <Text style={styles.headerSubtitle}>Tasas de Interés</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>
                <Text style={styles.columnHeaderText}>Tipo de Crédito</Text>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Text style={styles.columnHeaderText}>Tasa Anual (%)</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.cellText}>Cuenta de Ahorros</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={[styles.cellText, styles.rateText]}>
                  {bank.services.credits.rates.savings}%
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.cellText}>Crédito Hipotecario</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={[styles.cellText, styles.rateText]}>
                  {bank.services.credits.rates.mortgage}%
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.cellText}>Crédito Personal</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={[styles.cellText, styles.rateText]}>
                  {bank.services.credits.rates.personal}%
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Información Importante</Text>
            <Text style={styles.infoText}>
              • Las tasas pueden variar según el perfil del cliente
            </Text>
            <Text style={styles.infoText}>
              • Tasas referenciales sujetas a evaluación crediticia
            </Text>
            <Text style={styles.infoText}>
              • Consulte los términos y condiciones específicos
            </Text>
          </View>
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
  tableHeader: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  columnHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cellText: {
    fontSize: 14,
    color: '#333333',
  },
  rateText: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
