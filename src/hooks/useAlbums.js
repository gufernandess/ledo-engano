import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const albumsCollectionRef = collection(db, "albums");

  const getAlbums = async () => {
    setLoading(true);
    try {
      const data = await getDocs(albumsCollectionRef);
      const albumsList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAlbums(albumsList);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao buscar álbuns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const addAlbum = async (newAlbumData) => {
    try {
      await addDoc(albumsCollectionRef, newAlbumData);
      getAlbums();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao adicionar álbum:", err);
      throw err;
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const albumDocRef = doc(db, "albums", id);
      await deleteDoc(albumDocRef);
      getAlbums();
    } catch (err) {
      setError(err.message);
      console.error("Erro ao deletar álbum:", err);
    }
  };

  const updateAlbum = async (id, updatedData) => {
    try {
      const albumDocRef = doc(db, "albums", id);
      await updateDoc(albumDocRef, updatedData);
      getAlbums();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atualizar álbum:", err);
      throw err;
    }
  };

  return { albums, loading, error, addAlbum, deleteAlbum, updateAlbum };
};
