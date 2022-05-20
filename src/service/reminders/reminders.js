import { useState, useRef, useEffect, useContext } from "react";
import { API } from "../../components/config";
import { getLocalStorage } from "../auth/auth";
import { AuthContext } from "../context/AuthService";
import {
  createAReminder,
  discardAReminder,
  getReminders,
  updateAReminder,
} from "./restrequest";

export function useRestOperationReminder() {
  const isMounted = useRef(false);
  const [allReminders, setAllReminders] = useState(null);
  const [reminders, setReminders] = useState(null);
  const [favoriteReminders, setFavoriteReminders] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const token = getLocalStorage();

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await getReminders(`${API}/getmainreminders`, token);
        if (response.status) {
          const json = response.data;

          if (isMounted.current) {
            let favList = [];
            let mainList = [];
            for (const item of json) {
              if (item.favorite === true) {
                favList.push(item);
              } else {
                mainList.push(item);
              }
            }
            setFavoriteReminders(favList);
            setReminders(mainList);
            setAllReminders(mainList.concat(favList));
          }
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    if (isAuth && token && token !== "") init();

    return () => {
      isMounted.current = false;
    };
  }, [isAuth, token]);

  function updateRecord(record, fromDiscardSection) {
    const originalAllRecords = [...allReminders];
    const originalRecords = [...reminders];
    const originalFavoriteRecords = [...favoriteReminders];

    let newAllRecords = [];
    let newRecords = [];
    let favRecord = [];
    for (const item of allReminders) {
      if (item._id === record._id) {
        if (record.status !== "deactive") {
          let itemToStore = {
            ...item,
            title: record.title,
            description: record.description,
          };
          if (!record.favorite) {
            itemToStore.favorite = record.favorite;
          }

          newAllRecords.push(itemToStore);
          record.favorite === true
            ? favRecord.unshift(itemToStore)
            : newRecords.unshift(itemToStore);
        }
      } else {
        newAllRecords.push(item);
        item.favorite === true ? favRecord.push(item) : newRecords.push(item);
      }
    }

    if (fromDiscardSection) {
      record.favorite === true
        ? favRecord.unshift(record)
        : newRecords.unshift(record);
    }

    async function execFunction() {
      try {
        setReminders(newRecords);
        setFavoriteReminders(favRecord);
        setAllReminders(newAllRecords);
        await updateAReminder(
          `${API}/editreminder/${record._id}`,
          record,
          token
        );
      } catch (error) {
        setReminders(originalRecords);
        setFavoriteReminders(originalFavoriteRecords);
        setAllReminders(originalAllRecords);
      }
    }
    execFunction();
  }

  function discardRecord(itemID) {
    const originalAllRecords = [...allReminders];
    const originalRecords = [...reminders];
    const originalFavoriteRecords = [...favoriteReminders];

    let newAllRecords = [];
    let newRecords = [];
    let favRecord = [];
    for (const item of allReminders) {
      if (item._id !== itemID) {
        newAllRecords.push(item);
        item.favorite === true ? favRecord.push(item) : newRecords.push(item);
      }
    }

    async function execFunction() {
      try {
        setReminders(newRecords);
        setFavoriteReminders(favRecord);
        setAllReminders(newAllRecords);
        await discardAReminder(`${API}/deletereminder/${itemID}`, token);
      } catch (error) {
        setReminders(originalRecords);
        setFavoriteReminders(originalFavoriteRecords);
        setAllReminders(originalAllRecords);
      }
    }
    execFunction();
  }

  function addRecord(record) {
    setLoading(true);
    delete record._id;
    const originalRecords = [...reminders];
    const originalAllRecords = [...allReminders];
    const originaFavRecords = [...favoriteReminders];
    async function execFunction() {
      try {
        await createAReminder(`${API}/addreminder`, record, token).then(
          (res) => {
            if (res.data.favorite === true) {
              setFavoriteReminders([res.data, ...favoriteReminders]);
            } else {
              setReminders([res.data, ...reminders]);
            }

            setAllReminders([res.data, ...allReminders]);
            setLoading(false);
          }
        );
      } catch (error) {
        setReminders(originalRecords);
        setAllReminders(originalAllRecords);
        setFavoriteReminders(originaFavRecords);
        setLoading(false);
      }
    }
    execFunction();
  }

  return {
    reminders,
    favoriteReminders,
    error,
    loading,
    discardRecord,
    //updateStatusRecord,
    addRecord,
    updateRecord,
  };
}
