import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Card, CardContent } from '@mui/material';

// Define the columns for the DataGrid
const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'value', headerName: 'Value', width: 130 },
  {
    field: 'date',
    headerName: 'Date',
    width: 90,
    // Adjust valueGetter to handle Firestore Timestamp more robustly
    valueGetter: (params) => {
      if (params.row.date && typeof params.row.date.toDate === 'function') {
        return params.row.date.toDate().toLocaleDateString();
      }
      return '';
    },
  },
];

export default function App() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "debts"));
      const debtsArray = querySnapshot.docs.map(doc => {
        // Ensure the document's data is properly structured
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Handle the date field directly here
          date: data.date // Leave the date field as is; don't convert it here
        };
      });
      setDebts(debtsArray);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Debt Tracker
      </Typography>
      <Card sx={{ mb: 4, maxWidth: 345 }}> {/* Apply margin bottom */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Debt <small>including interest</small>
          </Typography>
          <Typography variant="h4">
            $200
          </Typography>
        </CardContent>
      </Card>
      <DataGrid
        rows={debts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Container>
  );
}
