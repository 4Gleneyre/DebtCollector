import './App.css';
import { useEffect, useState } from 'react';
import { db } from './firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

export default function App() {
  const [debts, setDebts] = useState([]); // State to store the debts

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "debts")); // Fetch data from "debts" collection
      const debtsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through documents and store data
      setDebts(debtsArray); // Update state with the fetched data
    };

    fetchData().catch(console.error);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <main>
      <h1>Debts</h1>
      <ul>
        {debts.map(debt => (
          <li key={debt.id}>
            {debt.name} {debt.value} {debt.date.toDate().toLocaleDateString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
