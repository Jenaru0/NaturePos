import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    marginTop: 16,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: 'green',
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: 'red',
  },
});

export default styles;
