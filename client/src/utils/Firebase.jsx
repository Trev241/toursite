import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

class FirebaseConnection {
  static #isInternalConstructing = false;
  static instance;

  constructor() {
    if (!FirebaseConnection.#isInternalConstructing) {
      throw new TypeError("FirebaseConnection is not constructable");
    }

    FirebaseConnection.#isInternalConstructing = false;

    const firebaseConfig = {
      apiKey: "AIzaSyDnu3HEzAb5YQ6945hjMvX1PkIlvljVHjU",
      authDomain: "toursite-d133f.firebaseapp.com",
      projectId: "toursite-d133f",
      storageBucket: "toursite-d133f.appspot.com",
      messagingSenderId: "341982185720",
      appId: "1:341982185720:web:e73fea88fb98b4c8bc130d",
      measurementId: "G-DEFYXV5GKN",
    };

    const app = initializeApp(firebaseConfig);
    const _ = getAnalytics(app);
    this.storage = getStorage();
  }

  static create() {
    if (FirebaseConnection.instance) return FirebaseConnection.instance;

    FirebaseConnection.#isInternalConstructing = true;
    FirebaseConnection.instance = new FirebaseConnection();

    return FirebaseConnection.instance;
  }

  async getImageURL(uri) {
    let url;

    try {
      url = await getDownloadURL(ref(this.storage, uri));
    } catch (err) {
      console.error(err);
    }

    return url;
  }

  async uploadFile(files) {
    console.log(files);
    const urls = [];

    for (const file of files) {
      console.log(file.name);
      const storageRef = ref(this.storage, file.name);

      const snapshot = await uploadBytes(storageRef, file);
      console.log(snapshot);

      urls.push(await getDownloadURL(snapshot.ref));
    }

    console.log(urls);
    return urls;
  }
}

let firebaseConnection = FirebaseConnection.create();
export default firebaseConnection;
