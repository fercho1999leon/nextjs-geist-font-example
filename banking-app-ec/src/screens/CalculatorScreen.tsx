import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, Text, SegmentedButtons, useTheme, Menu, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type CalculatorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Calculator'>;

interface Props {
  navigation: CalculatorScreenNavigationProp;
  route: any;
}

type TimeUnit = 'años' | 'semestres' | 'trimestres' | 'bimestres' | 'meses' | 'días' | 'quinquenios';
type CalculationType = 'simple' | 'compound' | 'amortization' | 'annuity';
type CapitalizationFrequency = 'anual' | 'semestral' | 'trimestral' | 'bimestral' | 'mensual' | 'quinquenal' | 'diario';

export default function CalculatorScreen({ route }: Props) {
  const { bankId } = route.params;
  const theme = useTheme();

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('años');
  const [calculationType, setCalculationType] = useState<CalculationType>('simple');
  const [capitalizationFrequency, setCapitalizationFrequency] = useState<CapitalizationFrequency>('anual');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Get bank data
  const currentBank = banks.find(bank => bank.id === bankId);

  // Auto-set interest rate based on calculation type and bank
  useEffect(() => {
    if (currentBank) {
      let autoRate = '';
      switch (calculationType) {
        case 'simple':
        case 'compound':
          autoRate = currentBank.services.credits.rates.savings.toString();
          break;
        case 'amortization':
          autoRate = currentBank.services.credits.rates.mortgage.toString();
          break;
        case 'annuity':
          autoRate = currentBank.services.credits.rates.personal.toString();
          break;
      }
      setRate(autoRate);
    }
  }, [calculationType, currentBank]);

  const getCapitalizationPeriodsPerYear = (frequency: CapitalizationFrequency): number => {
    switch (frequency) {
      case 'diario': return 365;
      case 'mensual': return 12;
      case 'bimestral': return 6;
      case 'trimestral': return 4;
      case 'semestral': return 2;
      case 'anual': return 1;
      case 'quinquenal': return 0.2;
      default: return 1;
    }
  };

  const calculateInterest = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const timeValue = parseFloat(time);

    setError(null);

    if (!amount || !rate || !time) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (isNaN(principal) || isNaN(annualRate) || isNaN(timeValue)) {
      setError('Por favor ingrese valores numéricos válidos');
      return;
    }

    if (principal <= 0) {
      setError('El monto debe ser mayor a 0');
      return;
    }

    if (annualRate <= 0) {
      setError('La tasa de interés debe ser mayor a 0');
      return;
    }

    if (timeValue <= 0) {
      setError('El plazo debe ser mayor a 0');
      return;
    }

    // Convert time to years
    let timeInYears = timeValue;
    switch (timeUnit) {
      case 'quinquenios':
        timeInYears = timeValue * 5;
        break;
      case 'semestres':
        timeInYears = timeValue / 2;
        break;
      case 'trimestres':
        timeInYears = timeValue / 4;
        break;
      case 'bimestres':
        timeInYears = timeValue / 6;
        break;
      case 'meses':
        timeInYears = timeValue / 12;
        break;
      case 'días':
        timeInYears = timeValue / 365;
        break;
    }

    const periodsPerYear = getCapitalizationPeriodsPerYear(capitalizationFrequency);
    let calculatedResult = 0;

    switch (calculationType) {
      case 'simple':
        // Simple interest doesn't use capitalization frequency
        calculatedResult = principal * (1 + annualRate * timeInYears);
        break;
        
      case 'compound':
        // Compound interest with capitalization frequency
        const ratePerPeriod = annualRate / periodsPerYear;
        const totalPeriods = periodsPerYear * timeInYears;
        calculatedResult = principal * Math.pow(1 + ratePerPeriod, totalPeriods);
        break;
        
      case 'amortization':
        // Amortization calculation (monthly payments)
        const monthlyRate = annualRate / 12;
        const months = timeInYears * 12;
        if (monthlyRate === 0) {
          calculatedResult = principal / months;
        } else {
          calculatedResult = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
        }
        break;
        
      case 'annuity':
        // Annuity calculation with capitalization frequency
        const periodRate = annualRate / periodsPerYear;
        const totalAnnuityPeriods = periodsPerYear * timeInYears;
        if (periodRate === 0) {
          calculatedResult = principal / totalAnnuityPeriods;
        } else {
          calculatedResult = principal * (periodRate * Math.pow(1 + periodRate, totalAnnuityPeriods)) / 
                           (Math.pow(1 + periodRate, totalAnnuityPeriods) - 1);
        }
        break;
    }

    setResult(calculatedResult);
  };

  const capitalizationOptions = [
    { value: 'diario', label: 'Diario' },
    { value: 'mensual', label: 'Mensual' },
    { value: 'bimestral', label: 'Bimestral' },
    { value: 'trimestral', label: 'Trimestral' },
    { value: 'semestral', label: 'Semestral' },
    { value: 'anual', label: 'Anual' },
    { value: 'quinquenal', label: 'Quinquenal' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Calculadora Financiera</Title>
        <Text style={styles.bankName}>{currentBank?.name}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <SegmentedButtons
            value={calculationType}
            onValueChange={value => setCalculationType(value as CalculationType)}
            buttons={[
              { value: 'simple', label: 'Simple' },
              { value: 'compound', label: 'Compuesto' },
              { value: 'amortization', label: 'Amortización' },
              { value: 'annuity', label: 'Anualidad' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Monto"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            placeholder="Ej: 10000"
            error={!!error && !amount}
          />

          <TextInput
            label={`Tasa de Interés (%) - ${currentBank?.name}`}
            value={rate}
            onChangeText={setRate}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            placeholder="Automático según banco"
            error={!!error && !rate}
            right={<TextInput.Icon icon="bank" />}
          />

          <TextInput
            label="Plazo"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            placeholder="Ej: 5"
            error={!!error && !time}
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Text style={styles.sectionTitle}>Unidad de Tiempo:</Text>
          <SegmentedButtons
            value={timeUnit}
            onValueChange={value => setTimeUnit(value as TimeUnit)}
            buttons={[
              { value: 'días', label: 'Días' },
              { value: 'meses', label: 'Meses' },
              { value: 'bimestres', label: 'Bimestres' },
            ]}
            style={styles.segmentedButtons}
          />
          
          <SegmentedButtons
            value={timeUnit}
            onValueChange={value => setTimeUnit(value as TimeUnit)}
            buttons={[
              { value: 'trimestres', label: 'Trimestres' },
              { value: 'semestres', label: 'Semestres' },
              { value: 'años', label: 'Años' },
            ]}
            style={styles.segmentedButtons}
          />

          <SegmentedButtons
            value={timeUnit}
            onValueChange={value => setTimeUnit(value as TimeUnit)}
            buttons={[
              { value: 'quinquenios', label: 'Quinquenios' },
            ]}
            style={styles.segmentedButtons}
          />

          {(calculationType === 'compound' || calculationType === 'annuity') && (
            <>
              <Text style={styles.sectionTitle}>Frecuencia de Capitalización:</Text>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setMenuVisible(true)}
                    style={styles.dropdownButton}
                    contentStyle={styles.dropdownContent}
                  >
                    {capitalizationOptions.find(opt => opt.value === capitalizationFrequency)?.label}
                  </Button>
                }
              >
                {capitalizationOptions.map((option) => (
                  <Menu.Item
                    key={option.value}
                    onPress={() => {
                      setCapitalizationFrequency(option.value as CapitalizationFrequency);
                      setMenuVisible(false);
                    }}
                    title={option.label}
                  />
                ))}
              </Menu>
            </>
          )}

          <Button
            mode="contained"
            onPress={calculateInterest}
            style={styles.button}
          >
            Calcular
          </Button>

          {result !== null && (
            <View style={styles.resultContainer}>
              <Title style={styles.resultTitle}>Resultado:</Title>
              <Text style={styles.resultText}>
                ${result.toLocaleString('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
              <Text style={styles.resultDescription}>
                {calculationType === 'amortization' 
                  ? 'Pago mensual'
                  : calculationType === 'annuity'
                  ? `Pago por período (${capitalizationOptions.find(opt => opt.value === capitalizationFrequency)?.label.toLowerCase()})`
                  : 'Monto final'}
              </Text>
              <Text style={styles.calculationDetails}>
                Banco: {currentBank?.name} | Tipo: {calculationType === 'simple' ? 'Interés Simple' : 
                calculationType === 'compound' ? 'Interés Compuesto' : 
                calculationType === 'amortization' ? 'Amortización' : 'Anualidad'}
                {(calculationType === 'compound' || calculationType === 'annuity') && 
                  ` | Capitalización: ${capitalizationOptions.find(opt => opt.value === capitalizationFrequency)?.label}`}
              </Text>
            </View>
          )}
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
  },
  bankName: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  dropdownButton: {
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  dropdownContent: {
    justifyContent: 'flex-start',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: '#ffffff',
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  resultDescription: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  calculationDetails: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});
