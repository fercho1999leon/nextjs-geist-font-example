import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, List, Divider, Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type RequirementsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Requirements'>;
type RequirementsScreenRouteProp = RouteProp<RootStackParamList, 'Requirements'>;

interface Props {
  navigation: RequirementsScreenNavigationProp;
  route: RequirementsScreenRouteProp;
}

export default function RequirementsScreen({ route }: Props) {
  const { bankId } = route.params;
  const bank = banks.find((b) => b.id === bankId);
  const theme = useTheme();

  if (!bank) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{bank.name}</Title>
        <Text style={styles.headerSubtitle}>Requisitos por Servicio</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.section}>
            <Title style={styles.sectionTitle}>
              Requisitos para Cuentas
            </Title>
            <List.Section>
              {bank.services.accounts.requirements.map((requirement, index) => (
                <List.Item
                  key={index}
                  title={requirement}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon="check-circle" 
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={styles.requirementText}
                  titleNumberOfLines={2}
                />
              ))}
            </List.Section>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Title style={styles.sectionTitle}>
              Requisitos para Créditos
            </Title>
            <List.Section>
              {bank.services.credits.requirements.map((requirement, index) => (
                <List.Item
                  key={index}
                  title={requirement}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon="check-circle" 
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={styles.requirementText}
                  titleNumberOfLines={2}
                />
              ))}
            </List.Section>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Title style={styles.sectionTitle}>
              Requisitos para Seguros
            </Title>
            <List.Section>
              {bank.services.insurance.requirements.map((requirement, index) => (
                <List.Item
                  key={index}
                  title={requirement}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon="check-circle" 
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={styles.requirementText}
                  titleNumberOfLines={2}
                />
              ))}
            </List.Section>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              * Documentos adicionales podrían ser requeridos según el caso
            </Text>
            <Text style={styles.infoText}>
              * Todos los documentos deben ser originales y copias
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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  requirementText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  divider: {
    marginVertical: 24,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});
