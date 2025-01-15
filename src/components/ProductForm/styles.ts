import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  form: {
padding: 16,
backgroundColor: 'white',
borderRadius: 8,
marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
  },
  card: {
    marginBottom: 16,
  },
  addButton: {
    marginTop: 16,
  },
  list: {
    flexGrow: 0,
  },
  listContainer: {
    paddingBottom: 16,
  },
  variantsList: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
  },
  saveButton: {
    marginBottom: 16,
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: 1,
  },

  // ...
  // Agrega los estilos que te faltan:
  imageSection: {
    marginTop: 16,
    marginBottom: 16,
    // Estilos que desees
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  removeImageButton: {
    // Estilo para el botón "Eliminar Imagen"
    marginVertical: 4,
  },
  pickImageButton: {
    // Estilo para el botón "Seleccionar Imagen"
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  helpText: {
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default styles;
