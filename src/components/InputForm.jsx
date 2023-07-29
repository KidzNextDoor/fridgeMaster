import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { Container, Grid, TextField, Button, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Suggestion from './Suggestion';

export default function InputForm() {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState(moment());
  const client = useQueryClient();

  function handleSubmit(e) {
    e.preventDefault();
    const email = decodeURIComponent(document.cookie.slice(6));
    axios
      .post('/api/inventory', {
        email: email,
        name: input,
        type: description,
        purchasedate: moment(),
        expdate: expiration,
      })
      .then(() => {
        setInput('');
        setDescription('');
        setExpiration(moment());
        client.invalidateQueries('contents');
      });
  }

  return (
    <Container maxWidth="md" sx={{ marginBottom: '4rem' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="ingredientInput"
              label="Name"
              variant="outlined"
              value={input}
              onChange={e => setInput(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="ingredientDescription"
              label="Description"
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker label="Expiration Date" value={expiration} />
          </Grid>

          <Grid item xs={2}>
            <Button size="lg" variant="outlined" type="submit">
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container>
        <Grid item xs={10}>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: 'transparent',
              minHeight: '4rem',
              marginTop: '1rem',
            }}
          >
            <Suggestion
              input={input.toLowerCase()}
              setExpiration={setExpiration}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
