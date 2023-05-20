import React, { useState } from 'react'
import {
  StatusBar,
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native'

const currencies = [
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'BTC', name: 'Bitcoin' },
]

const exchangeRates = {
  BRL: 1,
  USD: 0.234,
  EUR: 0.185,
  JPY: 27.624,
  BTC: 0.000032,
}

const App = () => {
  const [value, setValue] = useState('')
  const [inputCurrency, setInputCurrency] = useState(currencies[0])
  const [outputCurrency, setOutputCurrency] = useState(currencies[1])
  const [convertedValue, setConvertedValue] = useState('')

  const convertCurrency = () => {
    if (!value) {
      alert('digite um valor')
      return
    } else if (inputCurrency.code === outputCurrency.code) {
      alert('escolha moedas diferentes')
      return
    }

    const inputRate = exchangeRates[inputCurrency.code]
    const outputRate = exchangeRates[outputCurrency.code]
    const converted = (parseFloat(value) / inputRate) * outputRate
    setConvertedValue(converted.toFixed(2))
    setValue('')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.container}
      >
        <View style={styles.background} />
        <Text style={styles.title}>Conversor de Moeda</Text>
        <TextInput
          placeholder="Digite um valor"
          style={styles.input}
          onChangeText={setValue}
          value={value}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Moeda de Entrada:</Text>
        <View style={styles.buttonContainer}>
          {currencies.map(currency => (
            <Button
              key={currency.code}
              title={currency.code}
              onPress={() => setInputCurrency(currency)}
              color={inputCurrency.code === currency.code ? 'gray' : undefined}
            />
          ))}
        </View>
        <Text style={styles.label}>Moeda de Saída:</Text>
        <View style={styles.buttonContainer}>
          {currencies.map(currency => (
            <Button
              key={currency.code}
              title={currency.code}
              onPress={() => setOutputCurrency(currency)}
              color={outputCurrency.code === currency.code ? 'gray' : undefined}
            />
          ))}
        </View>
        <Button title="Converter" onPress={convertCurrency} />
        <Text style={styles.result}>
          Valor convertido para {outputCurrency.code}: {convertedValue}
        </Text>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
    opacity: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white',
  },
})

export default App
