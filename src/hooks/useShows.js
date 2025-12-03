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

export const useShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showsCollectionRef = collection(db, "shows");

  const getShows = async () => {
    setLoading(true);
    try {
      const data = await getDocs(showsCollectionRef);

      const showsList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setShows(showsList);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao buscar shows:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  const addShow = async (newShowData) => {
    try {
      await addDoc(showsCollectionRef, newShowData);

      getShows();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao adicionar show:", err);
      throw err;
    }
  };

  const deleteShow = async (id) => {
    try {
      const showDocRef = doc(db, "shows", id);
      await deleteDoc(showDocRef);

      getShows();
    } catch (err) {
      setError(err.message);
      console.error("Erro ao deletar show:", err);
    }
  };

  const updateShow = async (id, updatedData) => {
    try {
      const showDocRef = doc(db, "shows", id);

      await updateDoc(showDocRef, updatedData);

      getShows();
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atualizar show:", err);
      throw err;
    }
  };

  return {
    shows,
    loading,
    error,
    addShow,
    deleteShow,
    updateShow,
    refreshShows: getShows,
  };
};
