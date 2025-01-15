import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export async function uploadImageAsync(uri: string, path: string): Promise<string> {
  try {
    console.log('Iniciando subida de imagen...');
    console.log('URI recibido:', uri);

    // 1. Validar y convertir el URI en un archivo Blob
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`No se pudo obtener el archivo desde el URI: ${response.statusText}`);
    }
    const file = await response.blob();

    console.log('Archivo Blob generado:', file);

    // 2. Crear referencia en Firebase Storage
    const storageRef = ref(storage, path);

    // 3. Definir metadatos
    const metadata = {
      contentType: file.type, // Especifica el tipo MIME basado en el archivo
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null, // Puedes manejar el progreso aquí si es necesario
        (error) => {
          console.error('Error en la subida:', error.message);
          console.error('Error payload:', error.serverResponse); // Imprimir el payload del error
          reject(error);
        },
        async () => {
          // Obtener URL de descarga
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL de descarga generada:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en uploadImageAsync:', error.message);
      console.error('Error payload:', error); // Imprimir el payload del error
    } else {
      console.error('Error en uploadImageAsync:', error);
    }
    throw error;
  }
}
