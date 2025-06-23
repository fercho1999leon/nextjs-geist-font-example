import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, useTheme, SegmentedButtons, Chip } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { banks } from '../data/banks';

type LocationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Location'>;

interface Props {
  navigation: LocationScreenNavigationProp;
  route: any;
}

interface Location {
  name: string;
  address: string;
  schedule: string;
  type: 'branch' | 'atm';
  services?: string[];
}

type City = 'quito' | 'guayaquil' | 'riobamba' | 'cuenca';

const locationData: { [bankId: string]: { [city in City]: Location[] } } = {
  '1': { // Banco Pichincha
    quito: [
      {
        name: 'Sucursal Matriz Quito',
        address: 'Av. Amazonas N39-34 y Pereira, Quito',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Seguros', 'Cajero']
      },
      {
        name: 'Sucursal La Carolina',
        address: 'Av. Naciones Unidas y 10 de Agosto, Quito',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Cajero']
      },
      {
        name: 'Agencia CCI',
        address: 'Av. Amazonas y Naciones Unidas, CCI, Quito',
        schedule: 'Lun-Dom: 10:00-22:00',
        type: 'branch',
        services: ['Cuentas', 'Cajero']
      },
      {
        name: 'ATM El Ejido',
        address: 'Av. Patria y 6 de Diciembre, Quito',
        schedule: '24 horas',
        type: 'atm'
      },
      {
        name: 'ATM Quicentro Sur',
        address: 'Av. Morán Valverde y Quitumbe Ñan, Quito',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    guayaquil: [
      {
        name: 'Sucursal Guayaquil Centro',
        address: 'Av. 9 de Octubre 100 y Malecón, Guayaquil',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Seguros', 'Cajero']
      },
      {
        name: 'Agencia Mall del Sol',
        address: 'Av. Juan Tanca Marengo, Mall del Sol, Guayaquil',
        schedule: 'Lun-Dom: 10:00-22:00',
        type: 'branch',
        services: ['Cuentas', 'Cajero']
      },
      {
        name: 'ATM Malecón 2000',
        address: 'Malecón Simón Bolívar, Guayaquil',
        schedule: '24 horas',
        type: 'atm'
      },
      {
        name: 'ATM Aeropuerto José Joaquín de Olmedo',
        address: 'Av. de las Américas, Aeropuerto, Guayaquil',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    riobamba: [
      {
        name: 'Sucursal Riobamba',
        address: 'Av. Daniel León Borja y Primera Constituyente, Riobamba',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Cajero']
      },
      {
        name: 'ATM Parque Maldonado',
        address: 'Calle Primera Constituyente y 5 de Junio, Riobamba',
        schedule: '24 horas',
        type: 'atm'
      },
      {
        name: 'ATM Terminal Terrestre',
        address: 'Av. La Prensa, Terminal Terrestre, Riobamba',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    cuenca: [
      {
        name: 'Sucursal Cuenca Centro',
        address: 'Calle Bolívar 9-20 y Benigno Malo, Cuenca',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Seguros', 'Cajero']
      },
      {
        name: 'ATM Parque Calderón',
        address: 'Calle Sucre y Benigno Malo, Cuenca',
        schedule: '24 horas',
        type: 'atm'
      },
      {
        name: 'ATM Mall del Río',
        address: 'Av. Felipe II, Mall del Río, Cuenca',
        schedule: '24 horas',
        type: 'atm'
      }
    ]
  },
  '2': { // Banco Guayaquil
    quito: [
      {
        name: 'Sucursal Quito Norte',
        address: 'Av. Eloy Alfaro N39-61 y Portugal, Quito',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Seguros', 'Cajero']
      },
      {
        name: 'ATM El Bosque',
        address: 'Av. Al Napo y Río Coca, Quito',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    guayaquil: [
      {
        name: 'Sucursal Matriz Guayaquil',
        address: 'P. Icaza 200 y Pichincha, Guayaquil',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Seguros', 'Cajero']
      },
      {
        name: 'Sucursal Kennedy',
        address: 'Av. Francisco de Orellana y 9na Este, Guayaquil',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Cajero']
      },
      {
        name: 'ATM City Mall',
        address: 'Av. de las Américas, City Mall, Guayaquil',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    riobamba: [
      {
        name: 'Agencia Riobamba',
        address: 'Calle 10 de Agosto y Espejo, Riobamba',
        schedule: 'Lun-Vie: 9:00-17:00',
        type: 'branch',
        services: ['Cuentas', 'Cajero']
      },
      {
        name: 'ATM Centro Comercial Paseo Shopping',
        address: 'Av. Canónigo Ramos, Paseo Shopping, Riobamba',
        schedule: '24 horas',
        type: 'atm'
      }
    ],
    cuenca: [
      {
        name: 'Sucursal Cuenca',
        address: 'Av. Solano 1-38 y Hermano Miguel, Cuenca',
        schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
        type: 'branch',
        services: ['Cuentas', 'Créditos', 'Cajero']
      },
      {
        name: 'ATM Universidad de Cuenca',
        address: 'Av. 12 de Abril, Universidad de Cuenca, Cuenca',
        schedule: '24 horas',
        type: 'atm'
      }
    ]
  }
};

// Generate location data for all other banks
const generateLocationDataForAllBanks = () => {
  const allBanks = ['3', '4', '5', '6', '7', '8', '9', '10', '11'];
  
  allBanks.forEach(bankId => {
    if (!locationData[bankId]) {
      const bankName = banks.find(b => b.id === bankId)?.name || 'Banco';
      locationData[bankId] = {
        quito: [
          {
            name: `Sucursal Quito ${bankName}`,
            address: `Av. Amazonas y Colón, Quito`,
            schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
            type: 'branch',
            services: ['Cuentas', 'Créditos', 'Cajero']
          },
          {
            name: `ATM Quito Centro`,
            address: 'Av. 10 de Agosto y Colón, Quito',
            schedule: '24 horas',
            type: 'atm'
          },
          {
            name: `ATM Quicentro Norte`,
            address: 'Av. Eloy Alfaro y Amazonas, Quito',
            schedule: '24 horas',
            type: 'atm'
          }
        ],
        guayaquil: [
          {
            name: `Sucursal Guayaquil ${bankName}`,
            address: 'Av. 9 de Octubre y Luque, Guayaquil',
            schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
            type: 'branch',
            services: ['Cuentas', 'Créditos', 'Cajero']
          },
          {
            name: `ATM Guayaquil Centro`,
            address: 'Av. Boyacá y 10 de Agosto, Guayaquil',
            schedule: '24 horas',
            type: 'atm'
          },
          {
            name: `ATM Riocentro Sur`,
            address: 'Av. Plaza Dañín, Riocentro Sur, Guayaquil',
            schedule: '24 horas',
            type: 'atm'
          }
        ],
        riobamba: [
          {
            name: `Agencia Riobamba ${bankName}`,
            address: 'Av. Daniel León Borja y Espejo, Riobamba',
            schedule: 'Lun-Vie: 9:00-17:00',
            type: 'branch',
            services: ['Cuentas', 'Cajero']
          },
          {
            name: `ATM Riobamba Centro`,
            address: 'Calle 10 de Agosto y Primera Constituyente, Riobamba',
            schedule: '24 horas',
            type: 'atm'
          }
        ],
        cuenca: [
          {
            name: `Sucursal Cuenca ${bankName}`,
            address: 'Av. Solano y Gran Colombia, Cuenca',
            schedule: 'Lun-Vie: 9:00-17:00, Sáb: 9:00-13:00',
            type: 'branch',
            services: ['Cuentas', 'Créditos', 'Cajero']
          },
          {
            name: `ATM Cuenca Centro`,
            address: 'Calle Bolívar y Sucre, Cuenca',
            schedule: '24 horas',
            type: 'atm'
          }
        ]
      };
    }
  });
};

generateLocationDataForAllBanks();

export default function LocationScreen({ route }: Props) {
  const { bankId } = route.params;
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<City>('quito');
  
  const currentBank = banks.find(bank => bank.id === bankId);
  const locations = locationData[bankId]?.[selectedCity] || [];
  const branches = locations.filter(loc => loc.type === 'branch');
  const atms = locations.filter(loc => loc.type === 'atm');

  const cityOptions = [
    { value: 'quito', label: 'Quito' },
    { value: 'guayaquil', label: 'Guayaquil' },
    { value: 'riobamba', label: 'Riobamba' },
    { value: 'cuenca', label: 'Cuenca' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Ubicaciones y Sucursales</Title>
        <Text style={styles.bankName}>{currentBank?.name}</Text>
      </View>

      <View style={styles.citySelector}>
        <Text style={styles.sectionTitle}>Selecciona una ciudad:</Text>
        <SegmentedButtons
          value={selectedCity}
          onValueChange={value => setSelectedCity(value as City)}
          buttons={cityOptions}
          style={styles.segmentedButtons}
        />
      </View>

      {branches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sucursales en {cityOptions.find(c => c.value === selectedCity)?.label}</Text>
          {branches.map((location, index) => (
            <Card key={`branch-${index}`} style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Title style={styles.locationName}>{location.name}</Title>
                  <Chip mode="outlined" style={styles.typeChip}>Sucursal</Chip>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Dirección:</Text>
                  <Text style={styles.value}>{location.address}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Horario:</Text>
                  <Text style={styles.value}>{location.schedule}</Text>
                </View>
                {location.services && (
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Servicios:</Text>
                    <View style={styles.servicesContainer}>
                      {location.services.map((service, idx) => (
                        <Chip key={idx} style={styles.serviceChip} textStyle={styles.serviceChipText}>
                          {service}
                        </Chip>
                      ))}
                    </View>
                  </View>
                )}
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {atms.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cajeros Automáticos en {cityOptions.find(c => c.value === selectedCity)?.label}</Text>
          {atms.map((location, index) => (
            <Card key={`atm-${index}`} style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Title style={styles.locationName}>{location.name}</Title>
                  <Chip mode="outlined" style={[styles.typeChip, styles.atmChip]}>ATM</Chip>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Dirección:</Text>
                  <Text style={styles.value}>{location.address}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Disponibilidad:</Text>
                  <Text style={styles.value}>{location.schedule}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {locations.length === 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.noLocations}>
              No hay ubicaciones disponibles para {currentBank?.name} en {cityOptions.find(c => c.value === selectedCity)?.label}.
            </Text>
          </Card.Content>
        </Card>
      )}
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
  citySelector: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
    color: '#1a1a1a',
  },
  segmentedButtons: {
    marginTop: 8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  typeChip: {
    backgroundColor: '#e3f2fd',
  },
  atmChip: {
    backgroundColor: '#f3e5f5',
  },
  infoContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  serviceChip: {
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#f5f5f5',
  },
  serviceChipText: {
    fontSize: 12,
  },
  noLocations: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666666',
    padding: 24,
  },
});
