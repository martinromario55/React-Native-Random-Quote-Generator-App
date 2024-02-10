import { StatusBar } from 'expo-status-bar'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import * as Speech from 'expo-speech'

export default function App() {
  const [randomQuote, setRandomQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getRandomQuote()
  }, [])

  const getRandomQuote = () => {
    setIsLoading(true)
    fetch('http://api.quotable.io/random')
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        setRandomQuote(result.content)
        setAuthor(result.author)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const speak = () => {
    Speech.speak(randomQuote)
  }

  // console.log(`Quote: ${randomQuote} - ${author}`)
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar style="light" />}

      <View style={styles.section}>
        <Text style={styles.sectionText}>Quote of the Day</Text>
        <FontAwesome
          name="quote-left"
          size={24}
          color="black"
          style={[styles.sectionIcons, { marginBottom: -12 }]}
        />
        <Text style={styles.sectionQuote}>{randomQuote}</Text>
        <FontAwesome
          name="quote-right"
          size={24}
          color="black"
          style={[
            styles.sectionIcons,
            { textAlign: 'right', marginTop: -20, marginBottom: 20 },
          ]}
        />

        <Text style={styles.sectionAuthor}> ——— {author}</Text>

        <TouchableOpacity
          onPress={getRandomQuote}
          style={styles.button}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'New Quote'}
          </Text>
        </TouchableOpacity>

        <View style={styles.utils}>
          <TouchableOpacity onPress={speak} style={styles.utilsBtn}>
            <FontAwesome name="volume-up" size={24} color="#5372f0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.utilsBtn}>
            <FontAwesome name="copy" size={24} color="#5372f0" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.utilsBtn}>
            <FontAwesome name="twitter" size={24} color="#5372f0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionQuote: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    lineHeight: 26,
    letterSpacing: 1.1,
    fontWeight: '400',
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  sectionIcons: {
    fontSize: 20,
  },
  sectionAuthor: {
    textAlign: 'right',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#5372f0',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  utils: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  utilsBtn: {
    borderWidth: 2,
    borderColor: '#5372f0',
    borderRadius: 50,
    padding: 15,
  },
})
