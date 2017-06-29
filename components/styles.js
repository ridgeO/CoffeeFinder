import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headLine: {
    fontSize: 30,
    color: '#606060',
    textAlign: 'center',
    marginBottom: 50,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8
  },
  searchButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  resultThumbnail: {
    width: 100,
    height: 100
  }
});

export default styles;
